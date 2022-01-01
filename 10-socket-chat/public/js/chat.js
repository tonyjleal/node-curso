const url = (window.location.hostname.includes('localhost')) 
            ? 'http://localhost:8081/api/auth'
            : 'https://curso-node-restserver-tj.herokuapp.com/api/auth';


let user = null;
let socket = null;


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
    const socket = io({
        'extraHeaders' : {
            'x-token' : localStorage.getItem('token'),
        }
    });
}


const main = async() => {

    await validarJWT();

}

main();

