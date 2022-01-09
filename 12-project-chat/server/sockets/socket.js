const { Users } = require('../classes/users');
const { io } = require('../server');
const { createMessage } = require('../utils/utils');
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
        
        client.broadcast.emit('createMessage', createMessage('Admin',`${userDisconnect.name} abandonó el chat`));
        client.broadcast.emit('listUsers', users.getUsers());
    });

    client.on('sendMessage', (data) => {

        let user = users.getUser(client.id);
        let message = createMessage(user.name, data.message);

        client.broadcast.emit('createMessage', message);

    });

});