const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "anuj8384",
  password: "Anuj@8384",
  database: "ecommerce",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = connection;
