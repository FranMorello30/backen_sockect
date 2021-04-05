import { SERVER_PORT } from './global/enviornment';

import express from 'express';
import Server from './class/server';
import router from './routers/router';
import cors from 'cors';
// import bodyParser from 'body-parser';


const server = Server.instance;

// BodyParser
server.app.use(express.urlencoded({extended:true}));
server.app.use(express.json());


//cors
server.app.use( cors({ origin:true,credentials:true }))

// Rutas servicios
server.app.use('/',router);


server.start( ()=>{
    console.log(`Servidor corriendo en el puerto ${ SERVER_PORT }`)
})

