const connection = require("../config/db");

const User = {
  create: (user, callback) => {
    const query = "INSERT INTO users SET ?";
    connection.query(query, user, callback);
  },
  findByUsername: (username, callback) => {
    const query = "SELECT * FROM users WHERE username = ?";
    connection.query(query, [username], callback);
  },
};

module.exports = User;
