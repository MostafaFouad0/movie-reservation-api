function countSeatTypes(arr) {
  const counts = {
    vip: 0,
    regular: 0,
  };

  arr.forEach((item) => {
    const type = item.seat_type;
    if (type === "vip") {
      counts.vip++;
    } else if (type === "regular") {
      counts.regular++;
    }
  });
  return counts;
}
module.exports = { countSeatTypes };
