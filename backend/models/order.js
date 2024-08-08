// const connection = require("../config/db");

// const Order = {
//   create: (order, callback) => {
//     const query = "INSERT INTO orders SET ?";
//     connection.query(query, order, callback);
//   },
// };

// module.exports = Order;
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  });
  return Order;
};
