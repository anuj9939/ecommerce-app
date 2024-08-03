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
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const register = async (req, res) => {
  const { username, email, password, firstName, lastName, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, firstName, lastName, address });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.json({ success: true, message: "Success!", token: token, user: { username: user.username } });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = { register, login };
