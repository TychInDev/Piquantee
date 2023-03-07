// Import de multer
const multer = require('multer');

// Définition des fichiers 
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, + Date.now() + '.' + extension);
  }
});

// Export de multer 
module.exports = multer({storage: storage}).single('image');