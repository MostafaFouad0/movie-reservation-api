const express = require("express");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const app = express();
app.use(express.json());
const userRoutes = require("./src/routes/user/user_routes");
const adminRoutes = require("./src/routes/admin/admin_routes");
const moviesRoutes = require("./src/routes/movies/movies_routes");
const hallRoutes = require("./src/routes/hall/hall_routes");
const seatsRoutes = require("./src/routes/seats/seats_routes");
const showtimeRoutes = require("./src/routes/showtime/showtime_routes");
const reservationsRoutes = require("./src/routes/reservations/reservations_routes");
const { task } = require("./src/cronJobs/jobs");
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    useTempFiles: false,
  })
);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/hall", hallRoutes);
app.use("/api/seats", seatsRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/reservations", reservationsRoutes);
app.listen(process.env.PORT, () => {
  console.log("[!] server is running on port:", process.env.PORT);
});
