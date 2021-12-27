const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = ( socket ) => {
        

        socket.on('disconnect', () => {});

        socket.on('send-message', ( payload, callback ) => {
            
            const id = 123456;
            callback({ id, date: new Date().getTime() });
            
            socket.broadcast.emit('send-message', payload);
            
        });

}


module.exports = {
    socketController,
}

