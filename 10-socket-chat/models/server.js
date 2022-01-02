const express = require('express');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');
const cors = require('cors');

const { dbConnection } = require('../database/config');
const { socketController } = require('../sockets/controller.socket');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer( this.app );
        this.io = require('socket.io')(this.server);

        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:    '/api/uploads',
            users:      '/api/users',
        }

        // Conectar BBDD
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Sockets
        this.sockets();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));

    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.categories, require('../routes/categories') );
        this.app.use( this.paths.products, require('../routes/products') );
        this.app.use( this.paths.search, require('../routes/search') );
        this.app.use( this.paths.uploads, require('../routes/uploads') );
        this.app.use( this.paths.users, require('../routes/users') );
    }

    sockets() {
        this.io.on('connection', ( socket ) =>  socketController( socket, this.io ));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo el puerto`, this.port);
        })
    }

}


module.exports = Server;