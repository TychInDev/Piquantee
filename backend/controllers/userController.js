// Import des modules
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// Création d'un utilisateur
exports.signup = (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: "Adresse e-mail invalide" });
  }

  // Conversion de l'email en minuscules
  const email = req.body.email.toLowerCase();

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({ message: "Utilisateur créé !" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });
};

// Connexion d'un utilisateur
exports.login = (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: "Adresse e-mail invalide" });
  }

  // Conversion de l'email en minuscules
  const email = req.body.email.toLowerCase();

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "E-mail ou mot de passe incorrect" });
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res
            .status(401)
            .json({ error: "E-mail ou mot de passe incorrect" });
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign({ userId: user._id }, "secretkey", {
            expiresIn: "24h",
          }),
        });
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
