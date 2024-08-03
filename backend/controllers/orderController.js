const Order = require("../models/orderModel");

const createOrder = (req, res) => {
  const order = req.body;
  Order.create(order, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = { createOrder };
