var socket = io();

let params = new URLSearchParams( window.location.search);
if( !params.has('name') || !params.has('room')){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesario');
}

let user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('connectChat', user, function(resp){
        console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});




// Enviar información
// socket.emit('sendMessage', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMessage', function(mensaje) {

    console.log('Servidor:', mensaje);

});

socket.on('listUsers', (users) => {
    console.log(users);
});

socket.on('privateMessage', (message) => {
    console.log('Mensaje privado: ', message);
});