// const Product = require("../models/product");

// const getAllProducts = (req, res) => {
//   Product.getAll((err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// };

// const createProduct = (req, res) => {
//   const product = req.body;
//   Product.create(product, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// };

// module.exports = { getAllProducts, createProduct };
// Updated one
const { Product } = require("../models");

exports.getProducts = async (req, res) => {
  try {
    const { category, brand, sort } = req.query;
    const where = {};
    if (category) where.category = category;
    if (brand) where.brand = brand;
    const order = sort ? [[sort, "ASC"]] : [];

    const products = await Product.findAll({ where, order });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, category, brand, price, quantity } = req.body;
    const product = await Product.create({ name, category, brand, price, quantity });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { name, category, brand, price, quantity } = req.body;
    await product.update({ name, category, brand, price, quantity });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
