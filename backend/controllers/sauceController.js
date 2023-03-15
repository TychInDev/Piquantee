// Import du modèle de sauce
const Sauce = require("../models/sauceModel");

// Import du package fs
const fs = require("fs");

// Création d'une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() =>
      res.status(201).json({
        message: "Sauce enregistrée !",
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

// Récuperation de toutes les sauces

exports.getEverySauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// Récuperation d'une sauce

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Modification d'une sauce

exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      let sauceObject = { ...req.body };
      if (req.file) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          // Supprimer l'image précédente
        });
        sauceObject = {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };
      } else {
        sauceObject = { ...req.body, imageUrl: sauce.imageUrl };
      }
      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject })
        .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Suppresssion d'une sauce

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        console.log(`Fichier ${filename} supprimé !`);
      });
    })
    .catch((error) => res.status(500).json({ error }));
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Gestion des likes et dislikes ( reduire le code )

exports.manageRating = (req, res, next) => {
  if (req.body.like === 1) {
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id,
      }
    )
      .then(() => res.status(200).json({ message: "Sauce likée !" }))
      .catch((error) => res.status(400).json({ error }));
  }
  if (req.body.like === -1) {
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id,
      }
    )
      .then(() => res.status(200).json({ message: "Sauce dislikée !" }))
      .catch((error) => res.status(400).json({ error }));
  }
  if (req.body.like === 0) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
              _id: req.params.id,
            }
          )
            .then(() => res.status(200).json({ message: "Like annulé !" }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id,
            }
          )
            .then(() => res.status(200).json({ message: "Dislike annulé !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(404).json({ error }));
  }
};
