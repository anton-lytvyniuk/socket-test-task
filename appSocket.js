const express = require('express');
const http = require('http');
const IO = require('socket.io');

const { changeColor, getRooms } = require('./controllers');

class CAppSock {
    constructor() {
       this.transport = {
            IO: null
            , server: null
        };
        this.channels = {};
    }
  
    async runInstance(host) {
        const app = express();

        this.transport.server = http.Server(app).listen(host, () => {
            console.log(`TRANSPORT APP: ${host}`);
        });
        this.transport.IO = IO.listen(this.transport.server);

        const rooms = await getRooms();
        
        rooms.forEach(r => this.createChannel(r));
    }
  
    createChannel(channel) {
      let channelIO = {};
  
      return new Promise(created => {
        channelIO = this.transport.IO.of(`/${channel}`);
  
        channelIO.on('connection', client => {  
            this.addClient(client, channel);

            client.on('change-color', async () => {
                const color = await changeColor(channel);

                channelIO.emit('new-color', { color })
            })

            client.on('disconnect', () => {
                this.removeClient(client);
            });
        });
        this.channels[channel] = channelIO;
        
        created();
      });
    }
  
    addClient(client, channel) {
        console.log('Client connected', client.id, channel);
    }
  
    removeClient(client, channel) {
        console.log('Client disconected', client.id, channel);
    }
}
  
  module.exports = new CAppSock();