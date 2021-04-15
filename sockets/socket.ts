import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente:Socket) =>
{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente:Socket) =>
{
    cliente.on('disconnect',()=>{
        //console.log('cliente desconectado')
        usuariosConectados.borrarUsuario(cliente.id)
    });
}

export const mensaje = (cliente:Socket, io:socketIO.Server) => 
{
    cliente.on('mensaje', (payload: {de:string,cuerpo:string}) => {
        console.log('mensaje recibido',payload)
        
        io.emit('mensaje-nuevo',payload);
    })
}

export const usuario = (cliente:Socket, io:socketIO.Server) => 
{
    cliente.on('configurar-usuario', (payload: {nombre:string},callback:Function) => {
        //console.log('usuario recibido',payload)
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre)
     //   io.emit('usurio-recibido',payload);
        callback({
            ok:true,
            mensaje:`Usuario ${ payload.nombre } configurado`
        })
    })
}