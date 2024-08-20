function formatDate(inputDate) {
  // Remove the slashes from the input date string
  const formattedDate = inputDate.replace(/\//g, "");
  return formattedDate;
}

module.exports = { formatDate };
