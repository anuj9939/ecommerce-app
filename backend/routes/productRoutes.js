// const express = require("express");
// const { getAllProducts, createProduct } = require("../controllers/productController");
// const router = express.Router();

// router.get("/", getAllProducts);
// router.post("/", createProduct);

// module.exports = router;

// const express = require("express");
// const productController = require("../controllers/productController");
// const router = express.Router();

// router.post("/products", productController.addProduct);
// router.put("/products/:id", productController.updateProduct);
// router.delete("/products/:id", productController.deleteProduct);
// router.get("/products", productController.getProducts);
// router.get("/products/:id", productController.getProductById);

// module.exports = router;
// Updated one
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", authMiddleware, productController.addProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
