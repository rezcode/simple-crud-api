const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

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
    fileSize: 100000, // 100 KB
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png") {
      cb(new Error("file format .jpg .png only"), false);
      return;
    }
    cb(null, true);
  },
});

const uploadProductImage = (req, res, next) => {
  const uploadSingle = upload.single("img");
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      next();
    }
  });
};

module.exports = uploadProductImage;
