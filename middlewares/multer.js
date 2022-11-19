const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}_${Math.random()}_${uuidv4()}_${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("file format .jpg .png only!", false);
    }
  },
});

const uploadProductImage = (req, res, next) => {
  const uploadSingle = upload.single("img");
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(403).send(err);
    } else {
      next();
    }
  });
};

module.exports = uploadProductImage;
