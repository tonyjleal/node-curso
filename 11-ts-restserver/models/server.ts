import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from "cors";

import db from '../database/connection';
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
        
        this.dbConnection();

        this.middlewares();
        
        this.routes();

    }

    async dbConnection() {
        try {

            await db.authenticate();
            console.log('Connection has been established successfully.');
        
        } catch (error) {
            console.error('Unable to connect to the database:', error);        }
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