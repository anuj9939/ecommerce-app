const express = require("express");
const { createOrder } = require("../controllers/orderController");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/authMiddleware");

router.post("/", authenticateJWT, createOrder);

module.exports = router;
