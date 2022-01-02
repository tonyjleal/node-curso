const { validateJWT } = require("../helpers");
const { Chat } = require('../models');

const chat = new Chat();


const socketController = async ( socket, io ) => {

    const user = await validateJWT(socket.handshake.headers['x-token']);

    if( !user ) {
        socket.disconnect();
    }

    chat.connectUser(user);
    io.emit('active-users', chat.usersArr);
    
    socket.on('disconnect', () => {
        chat.disconnectUser(user.id);
        io.emit('active-users', chat.usersArr);
    });
}


module.exports = {
    socketController,
}