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
    socket.emit('public-messages', chat.lastTen);

    socket.on('disconnect', () => {
        chat.disconnectUser(user.id);
        io.emit('active-users', chat.usersArr);
    });

    socket.on('send-message', ( { uid, message } ) => {
        chat.sendMessage(user.uid, user.name, message);
        io.emit('public-messages', chat.lastTen);
    });
}


module.exports = {
    socketController,
}