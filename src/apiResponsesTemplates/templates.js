function formatFailToJSend(msg, status = 400) {
  const jsendError = {
    status: "Fail",
    data: {
      message: msg,
      status: status,
    },
  };
  return jsendError;
}

function formatErrorToJSend(msg, status = 500) {
  const jsendError = {
    status: "Error",
    data: {
      message: msg,
      status: status,
    },
  };
  return jsendError;
}
function formatSuccessToJSend(msg, status = 200, value = {}) {
  const jsendError = {
    status: "Ok",
    data: {
      message: msg,
      value: value,
      status: status,
    },
  };
  return jsendError;
}

module.exports = {
  formatFailToJSend,
  formatErrorToJSend,
  formatSuccessToJSend,
};
