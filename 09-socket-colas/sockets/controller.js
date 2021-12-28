const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = ( socket ) => {
        

        socket.on('disconnect', () => {});

        socket.emit('last-ticket', 'Ticket ' + ticketControl.last );

        socket.on('next-ticket', ( payload, callback ) => {
            
            const next = ticketControl.next();
            callback( next );
        
            // TODO notificar que hay un nuevo ticket pendiente
        });

}


module.exports = {
    socketController,
}

