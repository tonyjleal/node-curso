const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio público
        this.app.use( express.static('public') );

    }

    routes() {
     }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo el puerto`, this.port);
        })
    }

}


module.exports = Server;