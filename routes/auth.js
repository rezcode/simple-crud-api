const Router = require("express").Router();
const controller = require("../controllers/auth");

Router.post("/register", controller.register);

Router.post("/login", controller.login);

module.exports = Router;
