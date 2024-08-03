const connection = require("../config/db");

const Order = {
  create: (order, callback) => {
    const query = "INSERT INTO orders SET ?";
    connection.query(query, order, callback);
  },
};

module.exports = Order;
