import express, { Application } from 'express';
import dotenv from 'dotenv';

import userRoutes from '../routes/user.routes'

dotenv.config();

class Server {

    private app: Application;
    private port: string;
    private apiPaths: { users: string } = {
        users: '/api/users',
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8081';

        this.routes();
    }

    routes(): void {
        console.log(this.apiPaths.users);
        this.app.use( this.apiPaths.users, userRoutes );
    }

    listen(): void {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port }`); 
        });
    }
}

export default Server;