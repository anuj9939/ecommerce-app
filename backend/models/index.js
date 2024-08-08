// const { Sequelize } = require("sequelize");
// const config = require("../config/config");

// const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
//   host: config.db.host,
//   dialect: "mysql",
// });

// const Product = require("./product")(sequelize, Sequelize);
// const User = require("./user")(sequelize, Sequelize);
// const Cart = require("./cart")(sequelize, Sequelize);
// const Order = require("./order")(sequelize, Sequelize);

// Product.belongsToMany(Order, { through: "OrderProduct" });
// Order.belongsToMany(Product, { through: "OrderProduct" });
// User.hasMany(Order);
// Order.belongsTo(User);
// User.hasMany(Cart);
// Cart.belongsTo(User);

// sequelize.sync();

// module.exports = { sequelize, Product, User, Cart, Order };

// Updated One
const { Sequelize } = require("sequelize");
const config = require("../config/config");

// Initialize Sequelize instance
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: "mysql",
});

// Import models
const Product = require("./product")(sequelize, Sequelize);
const User = require("./user")(sequelize, Sequelize);
const Cart = require("./cart")(sequelize, Sequelize);
const Order = require("./order")(sequelize, Sequelize);

// Define associations
Product.belongsToMany(Order, { through: "OrderProduct" });
Order.belongsToMany(Product, { through: "OrderProduct" });
Order.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });
// User.hasMany(Order);
// Order.belongsTo(User);
User.hasMany(Cart);
Cart.belongsTo(User);

// Sync models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use alter to prevent dropping and recreating tables
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

// Call the sync function
syncDatabase();

module.exports = { sequelize, Product, User, Cart, Order };
