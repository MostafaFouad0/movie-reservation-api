const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const userRoutes = require("./src/routes/user/user_routes");
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("server is running on port:", process.env.PORT);
});
