require('dotenv').config();
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

const usersPath = path.join(__dirname, '../data/users.json');

// User Registration
router.post('/register', async (req, res) => {
  const { name, email, password, address } = req.body;

  fs.readFile(usersPath, 'utf8', async (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading users data' });
    }

    const users = JSON.parse(data);
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name,
      email,
      password: hashedPassword,
      address,
    };

    users.push(newUser);

    fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving user' });
      }
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        token: generateToken(newUser.id),
      });
    });
  });
});

// User Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  fs.readFile(usersPath, 'utf8', async (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading users data' });
    }

    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = router;
