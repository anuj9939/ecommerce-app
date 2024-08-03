const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const secret = "your_jwt_secret";

const register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { username, password: hashedPassword };

  User.create(user, (err, results) => {
    if (err) throw err;
    res.send({ message: "User registered successfully" });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });
        res.send({ token });
      } else {
        res.status(401).send({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  });
};

module.exports = { register, login };
