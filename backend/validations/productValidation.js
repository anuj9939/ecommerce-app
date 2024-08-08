const { body, validationResult } = require("express-validator");

exports.productValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("brand").notEmpty().withMessage("Brand is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
  body("quantity").isInt({ gt: 0 }).withMessage("Quantity must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
