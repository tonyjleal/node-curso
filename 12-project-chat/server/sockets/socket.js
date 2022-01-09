const { Users } = require('../classes/users');
const { io } = require('../server');

const users = new Users();

io.on('connection', (client) => {

    client.on('connectChat', (data, callback) => {

        if( !data.name ) {
            return callback({
                error: true,
                msg: 'El nombre es necesario'
            });
        }
        let listUsers = users.addUser(client.id, data.name);
        client.broadcast.emit('listUsers', users.getUsers());
        callback(listUsers);
    });
    
    client.on('disconnect', () => {
        let userDisconnect =  users.deleteUser(client.id);
        
        client.broadcast.emit('createMessage', { user:'Admin', message: `${userDisconnect.name} abandonó el chat`});
        client.broadcast.emit('listUsers', users.getUsers());
    });



});