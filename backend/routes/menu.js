const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');

const menuPath = path.join(__dirname, '../data/menu.json');

router.route('/').get((req, res) => {
  fs.readFile(menuPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading menu data' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

router.route('/add').post(protect, (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;

  fs.readFile(menuPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading menu data' });
    }

    const menu = JSON.parse(data);
    const newItem = {
      id: menu.length > 0 ? menu[menu.length - 1].id + 1 : 1,
      name,
      description,
      price,
      imageUrl,
      category,
    };

    menu.push(newItem);

    fs.writeFile(menuPath, JSON.stringify(menu, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving menu item' });
      }
      res.status(201).json(newItem);
    });
  });
});

router.route('/update/:id').put(protect, (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl, category } = req.body;

  fs.readFile(menuPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading menu data' });
    }

    let menu = JSON.parse(data);
    const itemIndex = menu.findIndex(item => item.id == id);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    menu[itemIndex] = { ...menu[itemIndex], name, description, price, imageUrl, category };

    fs.writeFile(menuPath, JSON.stringify(menu, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating menu item' });
      }
      res.json(menu[itemIndex]);
    });
  });
});

router.route('/delete/:id').delete(protect, (req, res) => {
  const { id } = req.params;

  fs.readFile(menuPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading menu data' });
    }

    let menu = JSON.parse(data);
    const updatedMenu = menu.filter(item => item.id != id);

    fs.writeFile(menuPath, JSON.stringify(updatedMenu, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting menu item' });
      }
      res.json({ message: 'Menu item deleted' });
    });
  });
});

module.exports = router;
