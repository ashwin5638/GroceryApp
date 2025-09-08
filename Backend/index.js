  const express = require("express");
  const cors = require("cors");
  const bcrypt = require("bcrypt");
  const { MongoClient } = require("mongodb");
  require("dotenv").config({ path: './.env' });

  const app = express();

  let db; 

  async function connectDB() {
    const DB = process.env.ATLAS_URI;
    const client = new MongoClient(DB);

    try {
      await client.connect();
      db = client.db('Grocery');
      console.log("✅ Database connected");
    } catch (e) {
      console.error("❌ DB connection error:", e);
    }
  }
  connectDB();


  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      message: "🚀 Server running",
      database: db ? "Connected" : "Not Connected",
    });
  });


  app.post("/register", async (req, res) => {
    console.log("Incoming body:", req.body);

    const { name, email, phone, password } = req.body;

      if (!email || !email.trim() || !password || !password.trim()) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    

    try {
      const existing = await db.collection("users").findOne({ email });
      if (existing) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashed = await bcrypt.hash(password, 10);

      await db.collection("users").insertOne({
        name: name || null,
        email,
        phone: phone || null,
        password: hashed,
        createdAt: new Date(),
      });

      res.status(201).json({ success: true, message: "User registered" });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ error: "Server error" });
    }
  });


  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Incoming login:", req.body);

      if (!email || !password) {
        return res.status(400).json({ error: "Email & password required" });
      }

      const user = await db.collection("users").findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });


  // Replace your existing cart routes with these fixed versions

app.post("/cart", async (req, res) => {
  try {
    const { cart, userId } = req.body;

    console.log("Received cart:", cart, "userId:", userId);
    
    if (!cart || !Array.isArray(cart)) {
      return res.status(400).json({ error: "Invalid cart data" });
    }

    if (userId) {
    
      const result = await db.collection("carts").findOneAndUpdate(
        { userId: userId },
        {
          $set: { 
            userId: userId,
            items: cart,  // Fixed: was "item", should be "items"
            updatedAt: new Date(),
            totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),  // Fixed: was "totalItem"
            totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          }
        },
        { upsert: true, returnDocument: 'after' }
      );
      
      return res.status(200).json({
        success: true,
        message: "Cart saved successfully",
        cartId: result.value ? result.value._id : null
      });
    } else {
      // Handle case when no userId (guest user)
      return res.status(400).json({ error: "User ID is required" });
    }
    
  } catch (error) {
    console.error("Cart save error:", error);
    res.status(500).json({ error: "Failed to save cart" });
  }
});

app.get("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log("Getting cart for userId:", userId);
    
    
    const cart = await db.collection("carts").findOne({ userId: userId });
    
    if (!cart) {
      return res.status(200).json({ 
        success: true, 
        cart: [],
        message: "No cart found"
      });
    }
    
  
    res.json({ 
      success: true, 
      cart: cart.items
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ error: "Failed to get cart" });
  }
});

app.delete("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log("Clearing cart for userId:", userId);
    

    await db.collection("carts").deleteOne({ userId: userId });
    
    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Delete cart error:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});



  app.get("/users", async (req, res) => {
    try {
      const users = await db
        .collection("users")
        .find({}, { projection: { password: 0 } })
        .toArray();
      res.json({ count: users.length, users });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
