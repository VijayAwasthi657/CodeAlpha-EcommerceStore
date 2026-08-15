require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");

// ===============================
// MODELS
// ===============================

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

// ===============================
// ROUTES
// ===============================

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/OrderRoutes");
console.log("orderRoutes type:", typeof orderRoutes);


// ===============================
// APP
// ===============================

const app = express();

// ===============================
// DATABASE RELATIONSHIPS
// ===============================

// User → Cart
User.hasOne(Cart, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Cart.belongsTo(User, {
  foreignKey: "userId",
});

// Cart → CartItems
Cart.hasMany(CartItem, {
  foreignKey: "cartId",
  onDelete: "CASCADE",
});

CartItem.belongsTo(Cart, {
  foreignKey: "cartId",
});

// Product → CartItems
Product.hasMany(CartItem, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

CartItem.belongsTo(Product, {
  foreignKey: "productId",
});

// ===============================
// ORDER RELATIONSHIPS
// ===============================

// User → Orders
User.hasMany(Order, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Order.belongsTo(User, {
  foreignKey: "userId",
});

// Order → OrderItems
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  onDelete: "CASCADE",
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
});

// Product → OrderItems
Product.hasMany(OrderItem, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

OrderItem.belongsTo(Product, {
  foreignKey: "productId",
});

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// ROUTES
// ===============================


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CodeAlpha E-commerce API is running",
  });
});

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test MySQL connection
    await sequelize.authenticate();

    console.log("MySQL database connected successfully");

    // Create/update database tables
    await sequelize.sync();

    console.log("Database tables synchronized successfully");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error.message);
  }
}

startServer();
