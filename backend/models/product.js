// const connection = require("../config/db");

// const Product = {
//   getAll: (callback) => {
//     const query = "SELECT * FROM products";
//     connection.query(query, callback);
//   },
//   create: (product, callback) => {
//     const query = "INSERT INTO products SET ?";
//     connection.query(query, product, callback);
//   },
// };

// module.exports = Product;
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Product = sequelize.define("Product", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: DataTypes.STRING,
//   category: DataTypes.STRING,
//   brand: DataTypes.STRING,
//   price: DataTypes.FLOAT,
//   stock: DataTypes.INTEGER,
// });

// module.exports = Product;
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
  });
  return Product;
};
