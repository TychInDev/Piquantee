const express = require("express");
const userRoutes = require("./routes/user");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:admin@hottakes.ofj0icp.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database connection error: " + err.message);
  });

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/user", userRoutes);

module.exports = app;
