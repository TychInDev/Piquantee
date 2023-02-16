// Import de mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.plugin(uniqueValidator);

// Export du modèle de l'utilisateur
module.exports = mongoose.model('User', userSchema);

