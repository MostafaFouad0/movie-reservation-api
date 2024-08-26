var cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { formatDate } = require("../utils/removeSlashes");
const { getCurrentDate } = require("../utils/getCurrentDate");
const { timeToMinutes } = require("../utils/timeToMinute");
const { getCurrentTime } = require("../utils/getCurrentTime");
var updateExpiredTickets = cron.schedule(
  "*/60 * * * *",
  async () => {
    console.log("[!] updating the expired tickets ...");
    var count = 0;
    const result = await prisma.ticket.findMany({
      where: {
        expired: false,
      },
      select: {
        id: true,
        showtime_date: true,
        showtime_relation: {
          select: {
            showtime_end: true,
          },
        },
      },
    });
    for (var i = 0; i < result.length; i++) {
      const ticketDate = formatDate(result[i].showtime_date);
      const currentDate = formatDate(getCurrentDate());
      if (ticketDate < currentDate) {
        count++;
        await prisma.ticket.update({
          where: {
            id: result[i].id,
          },
          data: {
            expired: true,
          },
        });
      } else if (ticketDate == currentDate) {
        const ticketTime = timeToMinutes(
          result[i].showtime_relation.showtime_end
        );
        const currentTime = timeToMinutes(getCurrentTime());
        if (currentTime >= ticketTime) {
          count++;
          await prisma.ticket.update({
            where: {
              id: result[i].id,
            },
            data: {
              expired: true,
            },
          });
        }
      }
    }
    console.log("number of records updated :", count);
  },
  {
    scheduled: false,
  }
);

module.exports = { updateExpiredTickets };
