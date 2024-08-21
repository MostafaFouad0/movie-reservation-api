const { PrismaClient } = require("@prisma/client");
const {
  formatErrorToJSend,
  formatSuccessToJSend,
  formatFailToJSend,
} = require("../../apiResponsesTemplates/templates");
const { getPayload } = require("../../auth/jwt_auth");
const { connect } = require("../user/user_routes");
const prisma = new PrismaClient();

const makeReservations = async (req, res) => {
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

module.exports = { makeReservations };
