const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');

const ordersPath = path.join(__dirname, '../data/orders.json');

router.route('/').get(protect, (req, res) => {
  fs.readFile(ordersPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading orders data' });
    }
    // In a real app, you'd filter by user
    res.json(JSON.parse(data));
  });
});

router.route('/create').post(protect, (req, res) => {
  const { items, totalPrice } = req.body;

  fs.readFile(ordersPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading orders data' });
    }

    const orders = JSON.parse(data);
    const newOrder = {
      id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
      items,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    fs.writeFile(ordersPath, JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving order' });
      }
      res.status(201).json(newOrder);
    });
  });
});

router.route('/update/:id').put(protect, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  fs.readFile(ordersPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading orders data' });
    }

    let orders = JSON.parse(data);
    const orderIndex = orders.findIndex(order => order.id == id);

    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }

    orders[orderIndex].status = status;

    fs.writeFile(ordersPath, JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating order' });
      }
      res.json(orders[orderIndex]);
    });
  });
});

module.exports = router;
