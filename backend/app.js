// Import des modules
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

// Import des controllers et des routes
const userController = require("./controllers/userController");
const userRoutes = require("./routes/userRoute");

const sauceController = require("./controllers/sauceController");
const sauceRoutes = require("./routes/sauceRoute");

const app = express();

// Utilisation de Helmet et cors 
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: ["http://localhost:4200", "http://localhost:3000"],
  })
);

// Utilisation de urlencoded 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connexion à la base de données
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

// Configuration de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Utilisation des routes
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
