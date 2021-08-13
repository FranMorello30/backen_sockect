import express from 'express';
import { SERVER_PORT } from '../global/enviornment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';
import db from "../database/connection";



export default class Server 
{
    private static _intance:Server;

    public app:express.Application;
    public port: number;
    //public io: socketIO.Server;
    private httpServer:http.Server;

    private constructor()
    {

        // server
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);


        //sockets
        //this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );
       // this.escucharSockets();


       //base datos
       this.dbConnection();

    }
    public static get instance()
    {
        return this._intance || (this._intance = new this());
    }
    start(callback:Function)
    {
        this.httpServer.listen(this.port, callback());
    }
    async dbConnection()
    {
        try {
            await db.authenticate()           
                .then(() => {
                    console.log('Conexion establecida');
                })
                .catch((err) => {
                    console.log('ocurrio un error al intentar conectar base de datos:', err);
                });

        } catch (error:any) {
            throw new Error(error);
        }
    }

    /*private escucharSockets()
    {
        console.log('escuchando conexiones - sockets')

        this.io.on('connection', cliente =>{
            
            //conectar cliente
            socket.conectarCliente(cliente,this.io);

            //configuaracion de mapa
            socket.mapaSockets(cliente,this.io);
            //configurar usuario
            socket.usuario(cliente,this.io)

            //obtener usuarios activos
            socket.obtenerUsuarios(cliente,this.io)
            
            // mensajes
            socket.mensaje(cliente,this.io);
        
            //desconectar
            socket.desconectar(cliente,this.io);
        })
    }*/

}