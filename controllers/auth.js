const modelAuth = require("../models/auth");
const modelUser = require("../models/users");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const saltPassword = await bcrypt.genSaltSync(15);
    const hashPassword = await bcrypt.hash(password, saltPassword);
    const checkEmail = await modelUser.getUserEmail(email);
    if (fullName === "" || email === "" || password === "") {
      res.status(401).send("All forms must be filled");
    } else if (checkEmail.rowCount === 1) {
      res.status(401).send("Email already exist");
    } else {
      await modelAuth.registerUser({
        fullName,
        email,
        password: hashPassword,
      });
      res.send({
        message: "Register user successfully",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(401).send({ error: "all forms must be fullfiled" });
    } else {
      const users = await modelUser.getUserEmail(email);
      if (users.rows.length === 0)
        return res.status(401).send({ error: "incorrect email" });
      // Password check
      const validPassword = await bcrypt.compare(
        password,
        users.rows[0].password
      );
      if (!validPassword) {
        return res.status(401).send({ error: "incorrect password" });
      } else {
        const jwt = require("jsonwebtoken");
        const token = jwt.sign(users.rows[0], process.env.SECRET_KEY, {
          expiresIn: "24h",
        });
        return res.status(200).send({
          message: "login successfully",
          data: { ...users?.rows[0], id: null, password: null },
          token,
        });
      }
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
