const {
  formatFailToJSend,
  formatSuccessToJSend,
} = require("../apiResponsesTemplates/templates");
function parse(content) {
  // Regular expression to match the required pattern (case insensitive)
  const regex = /^(VIP|vip|Regular|regular)(,(VIP|vip|Regular|regular))*$/;

  if (!regex.test(content)) {
    return {
      status: "Fail",
      message: "Invalid input format",
    };
  }

  const parts = content.split(",");
  const data = parts.map((type) => {
    return {
      seat_type: type.slice(0).toLowerCase(),
    };
  });
  return {
    status: "Ok",
    data: data,
  };
}
module.exports = { parse };
