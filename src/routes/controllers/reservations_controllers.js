const { PrismaClient } = require("@prisma/client");
const {
  formatErrorToJSend,
  formatSuccessToJSend,
  formatFailToJSend,
} = require("../../apiResponsesTemplates/templates");
const { getPayload } = require("../../auth/jwt_auth");
const { getCurrentDate } = require("../../utils/getCurrentDate");
const { formatDate } = require("../../utils/removeSlashes");
const prisma = new PrismaClient();

const makeReservations = async (req, res) => {
  const currentDate = formatDate(getCurrentDate());
  const showtimeDate = formatDate(req.query.date);
  if (showtimeDate < currentDate) {
    return res.status(400).json(formatFailToJSend("showtime date is invalid"));
  }
  const ticket = await prisma.ticket.findFirst({
    where: {
      showtime_id: +req.query.showtime_id,
      showtime_date: req.query.date,
      seat_id: +req.query.seat_id,
      expired: false,
    },
  });
  if (ticket)
    return res
      .status(200)
      .json(formatFailToJSend("this seat is already occupied"));
  const seat = await prisma.hall_seats.findFirst({
    where: {
      id: +req.query.seat_id,
    },
  });
  const showtime = await prisma.showtime.findFirst({
    where: {
      id: +req.query.showtime_id,
    },
  });
  let price = 0;
  if (seat.seat_type == "vip") {
    price = showtime.vip_seat_price;
  } else price = showtime.regular_seat_price;
  const newTicket = await prisma.ticket.create({
    data: {
      showtime_relation: {
        connect: {
          id: +req.query.showtime_id,
        },
      },
      user_ticket: {
        connect: {
          id: req.user.id,
        },
      },
      seat_ticket: {
        connect: {
          id: +req.query.seat_id,
        },
      },
      showtime_date: req.query.date,
      price: price,
    },
  });
  res
    .status(200)
    .json(formatSuccessToJSend("seat reserved successfully", newTicket));
};

const getReservations = async (req, res) => {
  const userId = req.user.id;
  const tickets = await prisma.ticket.findMany({
    where: {
      user_id: userId,
    },
    select: {
      seat_id: true,
      showtime_date: true,
      issued_date: true,
      expired: true,
      price: true,
      showtime_relation: {
        select: {
          showtime_movie: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  const formattedTickets = tickets.map((ticket) => ({
    seatId: ticket.seat_id,
    showtimeDate: ticket.showtime_date,
    issuedDate: ticket.issued_date,
    expired: ticket.expired,
    price: ticket.price,
    movieTitle: ticket.showtime_relation.showtime_movie.title,
  }));
  res
    .status(200)
    .json(
      formatSuccessToJSend(
        "reservations successfully retrieved",
        formattedTickets
      )
    );
};

module.exports = { makeReservations, getReservations };
