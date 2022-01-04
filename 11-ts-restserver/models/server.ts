import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from "cors";

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
        
        this.middlewares();
        
        this.routes();

    }

    routes(): void {
        this.app.use( this.apiPaths.users, userRoutes );
    }

    middlewares(): void {
        // CORS
        this.app.use(cors());

        // Lectura Body 
        this.app.use( express.json() );
        
        // Carpeta pública
        this.app.use( express.static('public') );
    }

    listen(): void {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port }`); 
        });
    }
}

export default Server;