const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("No credentials sent!");
    } else {
      const decoded = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.SECRET_KEY
      );
      if (decoded) {
        next();
      }
    }
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

module.exports = {
  verifyToken,
};
