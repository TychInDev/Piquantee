// Import des modules
const multer = require('multer');
const fs = require('fs');

// Définition des fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = 'images';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + '.' + extension);
  }
});

// Export de multer
module.exports = multer({storage: storage}).single('image');
