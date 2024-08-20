const { PrismaClient } = require("@prisma/client");
const { getPayload } = require("../../auth/jwt_auth");
const {
  formatErrorToJSend,
  formatSuccessToJSend,
  formatFailToJSend,
} = require("../../apiResponsesTemplates/templates");
const { parse } = require("../../utils/parseSeatsInfo");
const { countSeatTypes } = require("../../utils/countSeatTypes");
const prisma = new PrismaClient();
const addSeats = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(422).json(formatFailToJSend("No files were uploaded"));
  const hall_id = +req.params.hall_id;
  const hall = await prisma.hall.findFirst({
    where: {
      id: hall_id,
    },
  });
  if (!hall) return res.status(400).json(formatFailToJSend("hall not found."));
  const seats = await prisma.hall_seats.findMany({
    where: {
      id: hall_id,
    },
  });
  const current_counts = countSeatTypes(seats);
  const available_vip_cnt = hall.vip_seats_cnt - current_counts.vip;
  const available_regular_cnt = hall.regular_seats_cnt - current_counts.regular;
  const parsed_input = parse(req.files.file.data.toString());
  if (parsed_input.status == "Fail")
    return res.status(400).json(formatFailToJSend("invalid input format."));

  const to_be_added_counts = countSeatTypes(parsed_input.data);
  if (
    to_be_added_counts.vip > available_vip_cnt ||
    to_be_added_counts.regular > available_regular_cnt
  ) {
    return res.status(400).json(
      formatFailToJSend(
        "Seats counts are greater than the available seats in the hall.",
        {
          remaining_vip_seats_cnt: available_vip_cnt,
          remaining_regular_cnt: available_regular_cnt,
        }
      )
    );
  }
  for (var i = 0; i < parsed_input.data.length; i++) {
    await prisma.hall_seats.create({
      data: {
        hall_seat: {
          connect: {
            id: hall.id,
          },
        },
        seat_type: parsed_input.data[i].seat_type,
      },
    });
  }
  res.status(200).json(formatSuccessToJSend("Seats added successfully."));
};
module.exports = { addSeats };
