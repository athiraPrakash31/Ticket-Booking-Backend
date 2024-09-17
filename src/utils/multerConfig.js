const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure that the uploads folder exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.resolve(uploadDir);
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const uniqueFilename = `image-${Date.now()}-${file.originalname}`;
    callback(null, uniqueFilename);
  }
});

// File filter for image validation
const fileFilter = (req, file, callback) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);  // Accept file
  } else {
    callback(new Error("Invalid file type. Please upload an image (png, jpeg, jpg)."), false);
  }
};

// Multer configuration
const multerConfig = multer({
  storage,
  fileFilter
});

module.exports = multerConfig;
