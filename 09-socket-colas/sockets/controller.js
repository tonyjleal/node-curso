const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = ( socket ) => {
        

        socket.on('disconnect', () => {});

        socket.emit('last-ticket', 'Ticket ' + ticketControl.last );
        socket.emit('actual-state', ticketControl.lastFour );
        socket.emit('pending-tickets', ticketControl.tickets.length);
        
        
        socket.on('next-ticket', ( payload, callback ) => {
            
            const next = ticketControl.next();
            callback( next );
            
            socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
 
        });
        
        socket.on('attend-ticket', ( { desktop }, callback ) => {
            
            if ( !desktop ) {
                return callback({
                    ok: false,
                    msg: 'El escritorio es obligatorio',
                });
            }

            const ticket = ticketControl.serveTicket( desktop );
            
            socket.broadcast.emit('actual-state', ticketControl.lastFour);
            socket.emit('pending-tickets', ticketControl.tickets.length);
            socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
            
            if( !ticket ) {
                callback({
                    ok: false,
                    msg: 'Ya no hay tickets'
                });
            } else {
                callback({
                    ok: true,
                    ticket,
                })
            }
        });
}


module.exports = {
    socketController,
}

