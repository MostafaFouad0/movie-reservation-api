const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const userRoutes = require("./src/routes/user/user_routes");
const adminRoutes = require("./src/routes/admin/admin_routes");
const moviesRoutes = require("./src/routes/movies/movies_routes");
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/movies", moviesRoutes);

app.listen(process.env.PORT, () => {
  console.log("[!] server is running on port:", process.env.PORT);
});
