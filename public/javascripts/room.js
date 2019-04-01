$(document).ready(function() {
    const socket = io(`http://localhost:3030/${$('#main').text()}`, {
        forceNew: true,
        transprts: ['websocket'],
    });

    socket.on('connect', () => console.log('connected'));
    socket.on('new-color', ({ color }) => $('#color-btn').css('background-color', color));
    $('#color-btn').on('click', () => socket.emit('change-color'));
}); 
