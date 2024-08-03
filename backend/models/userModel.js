// const connection = require("../config/db");

// const User = {
//   create: (user, callback) => {
//     const query = "INSERT INTO users SET ?";
//     connection.query(query, user, callback);
//   },
//   findByUsername: (username, callback) => {
//     const query = "SELECT * FROM users WHERE username = ?";
//     connection.query(query, [username], callback);
//   },
// };

// module.exports = User;
//
// By squelize
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
  },
  {}
);

module.exports = User;
