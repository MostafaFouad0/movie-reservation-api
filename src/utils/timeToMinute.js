function timeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  // Convert the hours to minutes and add the minutes
  const totalMinutes = hours * 60 + minutes;

  return totalMinutes;
}

module.exports = { timeToMinutes };
