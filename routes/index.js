const express = require('express');

const { getRooms } = require('../controllers');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const rooms = await getRooms();
    
    res.render('index', { title: 'My test app', rooms });
  } catch (e) {
    res.status(e.status || 400).send(e);
  }
});

module.exports = router;
