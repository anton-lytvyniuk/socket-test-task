const { Rooms } = require('../db');
const colors = require('../constants').colors.map(c => c.toLowerCase());

async function getColor(room) {
    const data = await Rooms.findByPk(room);

    if (!data) {
        console.log(`WARNING!!! Room ${room} is not exist`);
        return null;
    }
    return data.color;
};

async function changeColor(room) {
    const ind = parseInt(Math.random() * colors.length);
    const color = colors[ind];
    
    await Rooms.update({ color }, { where: { room } });
    return color;
};

async function createRoom(newRoom) {
    const oldRoom = await Rooms.findByPk(newRoom);

    if (oldRoom) throw `Room ${newRoom} is already exist. Choose another room name`;
    const room = await Rooms.create({ room: newRoom });

    return room.color;
};

async function getRooms() {
    const rooms = await Rooms.findAll();

    return rooms.map(r => r.room).sort((a, b) => a > b);
}

module.exports = {
    getColor,
    changeColor,
    createRoom,
    getRooms,
};
