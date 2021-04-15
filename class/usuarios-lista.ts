import { Usuario } from './usuario';
import { usuario } from '../sockets/socket';


export class UsuariosLista
{
    private lista:Usuario[] = [];

    constructor(){}

    //agregar usuario
    public agregar(usuario:Usuario)
    {
        this.lista.push(usuario)
        return usuario
    }
    public actualizarNombre(id:string,nombre:string)
    {
        for(let usuario of this.lista)
        {
            if(usuario.id === id)
            {
                usuario.nombre = nombre;
                break;
            }
        }
    }
    public getLista()
    {
        return this.lista;
    }
    public getUsuario(id:string)
    {
        return this.lista.find( usuario =>{
            return usuario.id === id
        })
    }
    public getUsuariosSala(sala:string)
    {
        return this.lista.filter( usuario =>{
            return usuario.sala === sala
        })
        //return this.lista.filter( usuario => usuario.sala === sala)
    }
    public borrarUsuario(id:string)
    {
        const tempoUsuario = this.getUsuario(id)
        this.lista = this.lista.filter(usuario =>{
            return usuario.id !== id;
        })
        return tempoUsuario;
    }
}