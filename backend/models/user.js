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
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const User = sequelize.define(
//   "User",
//   {
//     username: { type: DataTypes.STRING, allowNull: false, unique: true },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//     firstName: { type: DataTypes.STRING, allowNull: false },
//     lastName: { type: DataTypes.STRING, allowNull: false },
//     address: { type: DataTypes.STRING, allowNull: false },
//   },
//   {}
// );

// module.exports = User;
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const User = sequelize.define("User", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: DataTypes.STRING,
//   email: { type: DataTypes.STRING, unique: true },
//   password: DataTypes.STRING,
// });

// module.exports = User;
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  return User;
};
