function formatFailToJSend(msg, value = []) {
  const jsendFail = {
    status: "Fail",
    data: {
      message: msg,
      values: value,
    },
  };
  return jsendFail;
}

function formatErrorToJSend(msg) {
  const jsendError = {
    status: "Error",
    data: {
      message: msg,
    },
  };
  return jsendError;
}
function formatSuccessToJSend(msg, value = null) {
  const jsendSuccess = {
    status: "Ok",
    data: {
      message: msg,
      values: value,
    },
  };
  return jsendSuccess;
}

module.exports = {
  formatFailToJSend,
  formatErrorToJSend,
  formatSuccessToJSend,
};
