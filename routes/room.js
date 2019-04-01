const express = require('express');

const { getColor, createRoom, getRooms } = require('../controllers');
const appSocket = require('../appSocket');

const router = express.Router();

router.get('/:room', async (req, res) => {
  try {
    const color = await getColor(req.params.room);

    res.status(200).render('room', { room: req.params.room, color });
  } catch (e) {
    res.status(e.status || 400).send(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const { room } = req.body;
    
    await createRoom(room);
    appSocket.createChannel(room);

    res.status(200).send({});
  } catch (e) {
    res.status(e.status || 400).send(e);
  }
});

module.exports = router;
