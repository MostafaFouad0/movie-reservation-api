const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  formatSuccessToJSend,
  formatFailToJSend,
} = require("../../apiResponsesTemplates/templates");

const { formatDate } = require("../../utils/removeSlashes");
const { timeToMinutes } = require("../../utils/timeToMinute");
function getDatesBetween(startDate, endDate) {
  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(
      new Date(currentDate).toISOString().slice(0, 10).replace(/-/g, "/")
    );
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return dates;
}

function validTimes(start, end) {
  start = timeToMinutes(start);
  end = timeToMinutes(end);
  return start < end;
}
const addShowtime = async (req, res) => {
  const {
    hall_id,
    movie_id,
    showtime_start,
    showtime_end,
    vip_seat_price,
    regular_seat_price,
  } = req.body;
  if (!validTimes(showtime_start, showtime_end)) {
    return res
      .status(400)
      .json(formatFailToJSend("end time must be after the start time"));
  }
  // get all showtimes that will be held in this hall
  const hall = await prisma.hall.findFirst({
    where: {
      id: hall_id,
    },
  });
  if (!hall) return res.status(400).json(formatFailToJSend("no such hall"));
  const movie = await prisma.movie.findFirst({
    where: {
      id: movie_id,
    },
  });
  if (!movie) return res.status(400).json(formatFailToJSend("no such movie"));
  const showtimes = await prisma.showtime_details.findMany({
    where: {
      showtime_relation: {
        hall_id: hall_id,
      },
    },
    select: {
      showtime_date: true,
      showtime_relation: {
        select: {
          showtime_start: true,
          showtime_end: true,
        },
      },
    },
  });
  const begin = formatDate(movie.release_date);
  const end = formatDate(movie.end_date);
  const showtime_time_begin = timeToMinutes(showtime_start);
  const showtime_time_end = timeToMinutes(showtime_end);
  for (var i = 0; i < showtimes.length; i++) {
    const currentDate = formatDate(showtimes[i].showtime_date);
    if (currentDate < begin || currentDate > end) continue;
    const timeStart = timeToMinutes(
      showtimes[i].showtime_relation.showtime_start
    );
    const timeEnd = timeToMinutes(showtimes[i].showtime_relation.showtime_end);
    if (
      Math.max(timeStart, showtime_time_begin) >
      Math.min(timeEnd, showtime_time_end)
    )
      continue;
    return res
      .status(400)
      .json(
        formatFailToJSend(
          "There is another movie playing in the hall at this time."
        )
      );
  }
  const newShowtime = await prisma.showtime.create({
    data: req.body,
  });
  const allDates = getDatesBetween(movie.release_date, movie.end_date);
  for (var i = 0; i < allDates.length; i++) {
    await prisma.showtime_details.create({
      data: {
        showtime_relation: {
          connect: {
            id: newShowtime.id,
          },
        },
        showtime_date: allDates[i],
      },
    });
  }
  res
    .status(200)
    .json(formatSuccessToJSend("showtime added successfully", newShowtime));
};

module.exports = { addShowtime };
