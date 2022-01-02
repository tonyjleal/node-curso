const { validateJWT } = require("../helpers");


const socketController = async ( socket ) => {


    const user = await validateJWT(socket.handshake.headers['x-token']);

    if( !user ) {
        socket.disconnect();
    }
    
    console.log('Conectado ', user.name);  
}


module.exports = {
    socketController,
}