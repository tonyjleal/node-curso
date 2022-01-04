const url = (window.location.hostname.includes('localhost')) 
            ? 'http://localhost:8081/api/auth'
            : 'https://curso-node-restserver-tj.herokuapp.com/api/auth';


let user = null;
let socket = null;


// Referencias HTML
const txtUid        = document.querySelector('#txtUid'); 
const txtMessage    = document.querySelector('#txtMessage');
const ulUsers       = document.querySelector('#ulUsers');
const ulMessages    = document.querySelector('#ulMessages');
const btnSignOut    = document.querySelector('#btnSignOut'); 

// Validar el token del localStorage;
const validarJWT = async() => {

    const token = localStorage.getItem('token') || '';

    if ( token.length <= 10 ) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch(`${ url }`, {
        headers: { 'x-token': token }
    });

    const { user: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB);
    user = userDB;
    
    document.title = user.name;

    await connectSocket();

}

const connectSocket = async() => {
    socket = io({
        'extraHeaders' : {
            'x-token' : localStorage.getItem('token'),
        }
    });

    socket.on('connect', () => {
        console.log('Socket online');
    });

    socket.on('disconnect', () => {
        console.log('Socket offline');
    });

    socket.on('public-messages', ( payload ) => {
        showPublicMessages(payload);
    });

    socket.on('active-users', showUsers);

    socket.on('private-messages', (payload) => {
        console.log('Private:', payload);
    });

}

const showPublicMessages = ( messages = []) => {
    let liItems = '';
    messages.forEach( ({name, message}) => {
        liItems += `
            <li>
                <p>
                    <span class="text-primary">${ name }</span>
                    <span>${ message }</span>
                </p>
            </li>
        `;
    });

    ulMessages.innerHTML = liItems;    
}

const showUsers = (users = []) => {
    let liItems = '';
    users.forEach( ({name, uid}) => {
        liItems += `
            <li>
                <p>
                    <h5 class="text-success">${ name }</h5>
                    <span class="fs-6 text-muted">${ uid }</span>
                    </p>
            </li>
        `;
    });

    ulUsers.innerHTML = liItems;
}


const main = async() => {

    await validarJWT();

}

txtMessage.addEventListener('keyup', ( { keyCode } ) => {

    const message = txtMessage.value;
    const uid = txtUid.value;

    if ( keyCode !== 13 || message.trim().length === 0 ) {
        return;
    }

    socket.emit('send-message', { message, uid } );
    txtMessage.value = '';
});


main();

