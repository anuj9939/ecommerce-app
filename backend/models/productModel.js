const connection = require("../config/db");

const Product = {
  getAll: (callback) => {
    const query = "SELECT * FROM products";
    connection.query(query, callback);
  },
  create: (product, callback) => {
    const query = "INSERT INTO products SET ?";
    connection.query(query, product, callback);
  },
};

module.exports = Product;
