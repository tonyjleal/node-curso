const url = (window.location.hostname.includes('localhost')) 
            ? 'http://localhost:8081/api/auth'
            : 'https://curso-node-restserver-tj.herokuapp.com/api/auth';


let user = null;
let socket = null;


// Validar el token del localStorage;
const validarJWT = async() => {

    const token = localStorage.getItem('token') || '';
console.log(token);
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


}


const main = async() => {

    await validarJWT();

}

main();

// const socket = io();
