// const express = require("express");
// const { register, login } = require("../controllers/authController");
// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;
//
// Updated one
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { register, login, updateProfile } = authController;
const { registerValidation, loginValidation, profileUpdateValidation } = require("../validations/authValidation");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.put("/profile", authMiddleware, profileUpdateValidation, updateProfile);

module.exports = router;
