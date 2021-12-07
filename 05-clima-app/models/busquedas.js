class Busquedas {

    historial = ['Madrid', 'Roma', 'París'];

    constructor () {
        // TODO readBD if exist
    }

    async ciudad ( lugar = '' ) {
        // petición http
        console.log(lugar);

        return []; // retornar lugares
    }

}

module.exports = Busquedas;