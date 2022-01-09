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
        callback(users.addUser(client.id, data.name));
    });


});