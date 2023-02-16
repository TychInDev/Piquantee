// Import des modules 
const express = require('express');
const router = express.Router();

// Import du controller de l'utilisateur
const userController = require('../controllers/userController');

// Définition des routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Export du router
module.exports = router;
