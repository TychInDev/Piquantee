// Import des modules
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multerConfig');

// Import du controller des sauces
const sauceCtrl = require('../controllers/sauceController');

// Définition des routes
router.get('/', auth, sauceCtrl.getEverySauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.manageRating);

// Export du router
module.exports = router;
