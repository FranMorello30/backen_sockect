import { Request,Response } from 'express';
import { generatJWT } from '../helpers/jwt';

import Usuario from '../models/usuario';
import bcrypt from 'bcryptjs';


// interfaces
import { userLogin } from '../interfaces/usuario';


export const loginUsuario = async (req:Request,res:Response) =>{
    
    const {email,password} = req.body

    try {
         // verificar email
        const usuarioDB:any = await Usuario.findOne({
            where:{
                email
                }
            });

        if(!usuarioDB)
        {
            return res.status(400).json({                
                msf:'contraseña o email no validos'
            })
        }

        const validPassword = bcrypt.compareSync(password,usuarioDB.password)
        if(!validPassword)
        {
            return res.status(400).json({                
                mgs:'contraseña o email no validos'
            })
        }

        //generar token = JWT
        const token = await generatJWT(usuarioDB.id);

        res.status(200).json({      
            token,            
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({      
            msg:'error al intentar acceder contacte con el administrador'
        })     
            
    }

    

    
}
export const crearUsuario = async (req:Request,res:Response) =>{
    
    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where:{
                email:body.email
            }
        });

        if(existeEmail)
        {
            return res.status(400).json({
                msg:'Ya existe un usurio con el email '+ body.email,            
            })
        }

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync(body.password,salt)

        const usuario = await Usuario.create(body);         


        res.json({
            usuario
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Hable con el administrador',            
        })
    }

    
}