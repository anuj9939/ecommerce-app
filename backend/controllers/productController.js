const Product = require("../models/productModel");

const getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const createProduct = (req, res) => {
  const product = req.body;
  Product.create(product, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = { getAllProducts, createProduct };
