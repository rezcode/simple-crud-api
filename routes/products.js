const Router = require("express").Router();
const controller = require("../controllers/products");
const middleware = require("../middlewares/verifyToken");
const multerMiddleware = require("../middlewares/multer");

Router.get("/", controller.getAllProducts);
Router.get("/:id", controller.getProductDetail);
Router.delete("/:id", middleware.verifyToken, controller.deleteSingleProduct);
Router.post(
  "/add",
  middleware.verifyToken,
  multerMiddleware,
  // eslint-disable-next-line comma-dangle
  controller.addNewProduct
);
Router.patch("/:id", middleware.verifyToken, controller.editProduct);
Router.patch(
  "/image/:id",
  middleware.verifyToken,
  multerMiddleware,
  controller.editProductImg
);

module.exports = Router;
