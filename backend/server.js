const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const menuRouter = require('./routes/menu');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

app.use('/api/menu', menuRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
