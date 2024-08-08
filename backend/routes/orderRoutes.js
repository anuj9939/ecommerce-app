// const express = require("express");
// const { createOrder } = require("../controllers/orderController");
// const router = express.Router();
// const { authenticateJWT } = require("../middlewares/authMiddleware");

// router.post("/", authenticateJWT, createOrder);

// module.exports = router;
//
// Update One
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, orderController.placeOrder);
router.get("/history", authMiddleware, orderController.getOrderHistory);

module.exports = router;
