// const Order = require("../models/order");

// const createOrder = (req, res) => {
//   const order = req.body;
//   Order.create(order, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// };

// module.exports = { createOrder };
// Updated one
const { Order, Product, Cart } = require("../models");

exports.placeOrder = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ where: { userId: req.user.id } });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: "Not enough stock for some items" });
      }
      total += product.price * item.quantity;
    }

    const order = await Order.create({ userId: req.user.id, total });
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      await product.update({ quantity: product.quantity - item.quantity });
      await order.addProduct(product, { through: { quantity: item.quantity } });
    }

    await Cart.destroy({ where: { userId: req.user.id } });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id }, include: ["Products"] });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
