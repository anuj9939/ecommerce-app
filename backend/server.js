// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
//
// 2nd way
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const sequelize = require("./config/db");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`{Server is running on port ${port}}`);
  });
});
