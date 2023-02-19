const path = require("path");

const ALLOWED_EXT = [".png", ".jpg", ".jpeg", ".webp"];

const fileExtLimiter = () => {
  return (req, res, next) => {
    const files = req.files;

    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    // Are the file extension allowed?
    const allowed = fileExtensions.every((ext) => ALLOWED_EXT.includes(ext));

    if (!allowed) {
      const message =
        `Upload failed. Only ${ALLOWED_EXT.toString()} files allowed.`.replaceAll(
          ",",
          ", "
        );

      return res.status(422).json({ status: "error", message });
    }

    next();
  };
};

module.exports = fileExtLimiter;
