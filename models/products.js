const db = require("../config/db");

const getAllProduct = () =>
  new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products ORDER BY id DESC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

const getProductDetail = (id) =>
  new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

const getProductName = (name) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM products WHERE name = $1`,
      [name],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });

const addNewProduct = (props) => {
  const { name, purchasePrice, sellPrice, img, stock } = props;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO products (name, purchase_price, sell_price, img, stock) 
      VALUES ($1, $2, $3, $4, $5)`,
      [name, purchasePrice, sellPrice, img, stock],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const editProduct = (props) => {
  const { name, purchasePrice, sellPrice, stock, id } = props;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE products SET name = $1, purchase_price = $2, sell_price = $3, stock = $4 WHERE id = $5 RETURNING *",
      [name, purchasePrice, sellPrice, stock, id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const editProductImg = (props) => {
  const { id, img } = props;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE products SET img = $1 WHERE id = $2 RETURNING *",
      [img, id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteSingleProduct = (id) =>
  new Promise((resolve, reject) => {
    db.query("DELETE FROM products WHERE id = $1", [id], (error, result) => {
      if (error) {
        reject(error);
      } else resolve(result);
    });
  });

module.exports = {
  getAllProduct,
  getProductDetail,
  addNewProduct,
  deleteSingleProduct,
  getProductName,
  editProduct,
  editProductImg,
};
