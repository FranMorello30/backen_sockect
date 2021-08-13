import jwt from 'jsonwebtoken';
import {NextFunction, Request,Response} from 'express';

export const validarJWT = (req:any,res:Response,next:NextFunction) =>
{
    //leer token
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg:'no hay token en la peticion'
        })
    }

    try {
        const superSecret = process.env.JWT_SECRET || 'sin-secret';
        //const  email  = jwt.verify();

        jwt.verify(token, superSecret, function(err:any, decoded:any) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } 

            console.log(decoded);

            req.id = decoded.id;
        });

        //jwt.verify( token, new Buffer( 'ThisStringIsASecret', 'base64' ), function ( err, decoded ) { /**/ });
        //console.log(email);

        //req.uid = email;

        
       
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg:'token no valido'
        }) 
    }

    next();
}