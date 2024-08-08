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
// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");

// const sequelize = require("./config/db");
// const bodyParser = require("body-parser");

// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");

// const port = process.env.PORT;
// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);

// sequelize.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`{Server is running on port ${port}}`);
//   });
// });

// Updated one
const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const config = require("./config/config");

const app = express();

app.use(bodyParser.json());

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
