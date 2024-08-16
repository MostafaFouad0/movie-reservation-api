function checkAdminRole(Payload) {
  return Payload.role == "admin";
}

module.exports = { checkAdminRole };
