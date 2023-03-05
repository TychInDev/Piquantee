// Import de mongoose
const mongoose = require('mongoose');

// Création du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index : { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
});


// Export du modèle de l'utilisateur
module.exports = mongoose.model('User', userSchema);

