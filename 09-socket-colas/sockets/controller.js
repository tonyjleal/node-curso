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
        
        socket.on('attend-ticket', ( { desktop }, callback ) => {
            
            if ( !desktop ) {
                return callback({
                    ok: false,
                    msg: 'El escritorio es obligatorio',
                });
            }

            const ticket = ticketControl.serveTicket( desktop );
            
            // TODO Notificar cambio en los últimos 4
            
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

