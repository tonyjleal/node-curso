//Configuración y comunicación con el servidor

// Referencias HTML
const lblOnline  = document.querySelector('#lblOnline'); 
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend    = document.querySelector('#btnSend');


const socket = io();

socket.on('connect', () => {

    console.log('Connected');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});

socket.on('disconnect', () => {

    console.log('Disconnected');

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';

});


btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    const payload = {
        message,
        id: '00sdf9as9fadfs-adsfasdfa0',
        date: new Date().getTime(),
    }
    socket.emit('send-message', payload);

});
