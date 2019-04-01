const Sequelize = require('sequelize');

const { database, username, password, host } = require('../db_config.json');
const { rooms } = require('../constants');

const sequelize = new Sequelize(database, username, password, { host, dialect: 'postgres' });

const Rooms = sequelize.define('Room', {
    room: { type: Sequelize.STRING, primaryKey: true },
    color: { type: Sequelize.STRING, defaultValue: 'yellow' },
}, { timestamps: false });

async function init() {
    await Rooms.sync({ force: false });

    await Promise.all(rooms.map(async r => {
        const room = await Rooms.findByPk(r);

        return room || Rooms.create({ room: r });
    }));
};

module.exports = {
    Rooms,
    init,
};
