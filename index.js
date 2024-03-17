const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const Data = require("./models/user");
const config = require("./config");

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post('/signin-secret', async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    
    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if email already exists
    const existingUser = await Data.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new user with hashed password
    const newUser = new Data({ username, email, password: hashedPassword });
    await newUser.save();

    // Send a success response to the client
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/login-secret', async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    console.log(username);
    console.log(password);
    // Find the user by username in the database
    
    const user = await Data.find({email});
    console.log(user);

    const passwordMatch = await bcrypt.compare(password, user[0].password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      //return res.status(401).json({ message: "Invalid password" });
      res.redirect('/');
    }
  
    if(passwordMatch ){
        console.log("success");
        
        // res.send(__dirname + '/../public/login.html');
        //res.sendFile(__dirname + '/auth/zindex');
        //res.sendFile(dirname__+'http://localhost:4000/zindex.html');
        res.redirect('./public/model.html');
        
        
        
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
  
});
app.post()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
