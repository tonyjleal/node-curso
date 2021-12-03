
// setTimeout(() => {
//     console.log('Hola Mundo');
// }, 1000);

const getUsuarioById = (id, callback) => {
    const user = {
        // id: id,
        id,
        nombre: 'Antonio',
    }

    setTimeout(() => {
       callback(user);
    }, 1500);
}

getUsuarioById(10, ( usuario ) => {
    console.log( usuario.id );
    console.log(usuario.nombre.toUpperCase());
});
