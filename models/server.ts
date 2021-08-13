import  express, {Application}  from "express";
import cors from 'cors';

import db from "../database/connection";
//import userRoutes from '../routes/usuario';


class Server 
{
    private app:Application;
    private port:string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor()
    {
        this.app  = express();
        this.port = process.env.PORT || '8000';
        
        //base datos
        this.dbConnection();

        //middlewares
        this.middlewares();
        
        //definir rutas
        this.routes();
    }
    async dbConnection()
    {
        try {
            await db.authenticate();
            console.log('base de datos online')

        } catch (error:any) {
            throw new Error(error);
        }
    }

    // funcion que se ejecuta antes de llamar a una funcion o controllador en la ruta
    middlewares()
    {
        // CORS
        this.app.use(cors());
       
        //Lectura del body
        this.app.use(express.json());

        //Caperta publica
        this.app.use(express.static('public'));
    }

    routes()
    {
       // this.app.use(this.apiPaths.usuarios,userRoutes)
    }

    listen()
    {
        this.app.listen(this.port, ()=>{
            console.log('servidor corriendo'+ this.port);
        })
    }
}

export default Server;