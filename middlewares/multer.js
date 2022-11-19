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
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png") {
      cb(new Error("file format .jpg .jpeg .png .webp only"), false);
    } else {
      cb(null, true);
    }
  },
});

const uploadProductImage = (req, res, next) => {
  console.log("sfdsdf");
  const uploadSingle = upload.single("img");
  uploadSingle(req, res, (err) => {
    // if (err instanceof multer.MulterError) {
    //   // A Multer error occurred when uploading.
    // } else if (err) {
    //   // An unknown error occurred when uploading.

    // }
    console.log("sfdsdf");
    if (err) {
      console.log(err);
      next();
      return res.status(403).send(err.message);
    } else {
      console.log("ghjgffhg");
      next();
    }
  });
};

module.exports = uploadProductImage;
