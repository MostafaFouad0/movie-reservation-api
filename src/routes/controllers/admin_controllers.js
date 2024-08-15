const { PrismaClient } = require("@prisma/client");
const { getPayload } = require("../../auth/jwt_auth");
const prisma = new PrismaClient();
const {
  formatSuccessToJSend,
  formatFailToJSend,
} = require("../../apiResponsesTemplates/templates");

const changeToAdmin = async (req, res) => {
  const userId = +req.params.user_id;
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const payload = getPayload(token);
  if (payload.role != "admin")
    return res
      .status(401)
      .json(
        formatFailToJSend("you are not unauthorized to access this endpoint.")
      );
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user || !user.active)
    return res.status(400).json(formatFailToJSend("no such user."));
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "admin",
    },
  });
  return res.status(200).json(formatSuccessToJSend("user is now an admin."));
};

module.exports = { changeToAdmin };
