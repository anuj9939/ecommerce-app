// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("../models/userModel");

// const secret = "your_jwt_secret";

// const register = (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 10);
//   const user = { username, password: hashedPassword };

//   User.create(user, (err, results) => {
//     if (err) throw err;
//     res.send({ message: "User registered successfully" });
//   });
// };

// const login = (req, res) => {
//   const { username, password } = req.body;

//   User.findByUsername(username, (err, results) => {
//     if (err) throw err;
//     if (results.length > 0) {
//       const user = results[0];
//       if (bcrypt.compareSync(password, user.password)) {
//         const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });
//         res.send({ token });
//       } else {
//         res.status(401).send({ message: "Invalid credentials" });
//       }
//     } else {
//       res.status(401).send({ message: "Invalid credentials" });
//     }
//   });
// };

// module.exports = { register, login };
//
// 2nd way
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { User } = require("../models/userModel");

// const register = async (req, res) => {
//   const { username, email, password, firstName, lastName, address } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, email, password: hashedPassword, firstName, lastName, address });

//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).send("Server error");
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).send("Invalid credentials");
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

//     res.json({ success: true, message: "Success!", token: token, user: { username: user.username } });
//   } catch (error) {
//     res.status(500).send("Server error");
//   }
// };

// module.exports = { register, login };
// Updated one
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const config = require("../config/config");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    await user.update(updateData);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
