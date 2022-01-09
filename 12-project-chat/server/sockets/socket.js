const { Users } = require('../classes/users');
const { io } = require('../server');
const { createMessage } = require('../utils/utils');
const users = new Users();

io.on('connection', (client) => {

    client.on('connectChat', (data, callback) => {

        if( !data.name || !data.room) {
            return callback({
                error: true,
                msg: 'El nombre y sala son necesarios'
            });
        }

        client.join(data.room);

        users.addUser(client.id, data.name, data.room);
        client.broadcast.to(data.room).emit('listUsers', users.getUsersByRoom(data.room));
        callback(users.getUsersByRoom(data.room));
    });
    
    client.on('disconnect', () => {
        let userDisconnect =  users.deleteUser(client.id);
        
        client.broadcast.to(userDisconnect.room).emit('createMessage', createMessage('Admin',`${userDisconnect.name} abandonó el chat`));
        client.broadcast.to(userDisconnect.room).emit('listUsers', users.getUsersByRoom(userDisconnect.room));
    });

    client.on('sendMessage', (data) => {

        let user = users.getUser(client.id);
        let message = createMessage(user.name, data.message);

        client.broadcast.to(user.room).emit('createMessage', message);

    });

    client.on('privateMessage', (data) => {
        let user = users.getUser(client.id);
        client.broadcast.to(data.para).emit('privateMessage', createMessage(user.name, data.message));
    });

});