const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();



const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
          process.exit(1);
      
    }
    console.log('Connected to the database');
})


app.use(cors({origin: '*'}));
app.use(express.json({limit: '10MB'}));
app.use(express.urlencoded({limit: '10MB', extended: true}));



app.get('/', (req,res) => {
    res.send('Hello World!')
})


// backend/routes/cart.js
app.post("/cart", (req, res) => {
  const { cart } = req.body;

  if (!Array.isArray(cart)) {
    return res.status(400).json({ error: "Cart must be an array" });
  }

  const sql = "INSERT INTO cart_items (product_id, name, price, quantity) VALUES ?";
  const values = cart.map(item => [item.id, item.name, item.price, item.quantity]);

  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Cart items inserted successfully" });
  });
});



app.post('/Users/login', async (req, res) => {
    let { emailAddress, Password } = req.body;
    console.log(emailAddress, Password);

    // Basic input validation
    if (!emailAddress || !Password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.query(`SELECT * FROM Users WHERE emailAddress = ?`, [emailAddress], async (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }

        let passwordfromDB = result[0].password;
        let isMatched = bcrypt.compareSync(Password, passwordfromDB);
          if (isMatched) {
            return res.status(200).json({ success: true, message: "Login successful" });
        } else {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
         
    });
});



app.post("/Users/register",(req,res) =>{
    const {name,emailAddress,phoneNumber,Password} = req.body;

    const hashedPassword = bcrypt.hashSync(Password, 10);
    const query = `INSERT INTO Users (name, emailAddress, phoneNumber, Password) VALUES (?, ?, ?, ?)`
    db.query(query, [name, emailAddress,phoneNumber, hashedPassword], (err,result) =>{
        if(err){
            console.log(err);
            return res.status(500).json({error: "Database error"});
        }
        console.log(req.body)
        return res.status(200).json("User registered successfully");
    })
})


const PORT = process.env.PORT 
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});