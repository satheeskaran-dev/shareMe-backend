const multer = require("multer");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const baseName = require("../baseName");
const { join } = require("path");

/* FILE STORAGE */

const userImagePath = join(baseName, "/public/assets/");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    if (!fs.existsSync(userImagePath + file.fieldname)) {
      await fsPromises.mkdir(userImagePath + file.fieldname, {
        recursive: true,
      });
    }
    cb(null, userImagePath + file.fieldname);
  },

  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg .webp format allowed!"));
    }
  },
});

module.exports = { upload };
