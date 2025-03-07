import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  });

// File filter to allow only image uploads
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

export const upload = multer({ storage, fileFilter });
