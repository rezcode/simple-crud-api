const model = require("../models/products");
const cloudinary = require("../middlewares/cloudinary");

const getAllProducts = async (req, res) => {
  try {
    const getData = await model.getAllProduct();

    if (getData.rows.length === 0) {
      res.status(404).send("Product not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(401).send("Something wrong, get product failed!");
  }
};

const getProductDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getData = await model.getProductDetail(id);

    if (getData.rows.length === 0) {
      res.status(400).send("Product not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).send("Something wrong, get product failed!");
  }
};

const deleteSingleProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await model.deleteSingleProduct(id);

    res.send({
      message: `Product successfully deleted`,
    });
  } catch (error) {
    res.status(400).send("Something wrong, delete product failed!");
  }
};

const addNewProduct = async (req, res) => {
  try {
    const { name, purchasePrice, sellPrice, stock } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    const img = result?.url;
    const checkNameProduct = await model.getProductName(name);
    if (checkNameProduct.rowCount > 0) {
      res
        .status(401)
        .send(`Product with name '${name}' has already been taken`);
    } else {
      await model.addNewProduct({
        name,
        purchasePrice,
        sellPrice,
        img,
        stock,
      });
      res.send({
        message: `${name} recipe successfully added`,
        data: {
          name,
          purchasePrice,
          sellPrice,
          img,
          stock,
        },
      });
    }
  } catch (error) {
    res
      .status(401)
      .send({ message: "add product failed", error: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, purchasePrice, sellPrice, stock } = req.body;
    const checkProductDetail = await model.getProductDetail(id);
    const checkProductName = await model.getProductName(name);

    if (checkProductName.rowCount > 0) {
      res.status(401).send("Name product has already been taken");
    } else if (checkProductDetail.rowCount > 0) {
      let inputName = name || checkProductDetail?.rows[0]?.name;
      let inputPurchasePrice =
        purchasePrice || checkProductDetail?.rows[0].purchase_price;
      let inputSellPrice = sellPrice || checkProductDetail?.rows[0].sell_price;
      let inputStock = stock || checkProductDetail?.rows[0].stock;
      let result = await model.editProduct({
        name: inputName,
        purchasePrice: inputPurchasePrice,
        sellPrice: inputSellPrice,
        stock: inputStock,
        id: id,
      });

      // console.log(dataEdited);
      res.send({ message: `edit product successfully`, data: result.rows });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("Something wrong, edit product failed!");
  }
};

const editProductImg = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await cloudinary.uploader.upload(req.file.path);
    const image = result?.url;
    const checkProductDetail = await model.getProductDetail(id);
    if (checkProductDetail.rowCount > 0) {
      let img = image || checkProductDetail?.rows[0].img;
      let result = await model.editProductImg({
        id,
        img,
      });

      res.send({
        message: "edit product image successfully",
        data: result.rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("Something wrong, edit product img failed!");
  }
};

module.exports = {
  getAllProducts,
  getProductDetail,
  deleteSingleProduct,
  addNewProduct,
  editProduct,
  editProductImg,
};
