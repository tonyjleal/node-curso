const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.get('/api', (req, res) => {
            res.json({
                message: 'get API'
            });
        });

        this.app.put('/api', (req, res) => {
            res.json({
                message: 'put API'
            });
        });

        this.app.post('/api', (req, res) => {
            res.json({
                message: 'post API'
            });
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                message: 'delete API'
            });
        });

        this.app.patch('/api', (req, res) => {
            res.json({
                message: 'patch API'
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo el puerto`, this.port);
        })
    }

}


module.exports = Server;