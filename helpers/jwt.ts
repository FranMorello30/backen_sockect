import jwt from 'jsonwebtoken';

export const generatJWT = (id:number) =>
{
    return new Promise((resolve,reject) =>{
        
        
        const payload = {
            id
        }
        jwt.sign(payload,process.env.JWT_SECRET || 'sin-secret',{
            expiresIn:'12h'
        },(error,token) =>{
            if(error){
                console.log(error)
                reject('no se puedo generar JWT')
            }else{
                resolve(token)
            }

        });

    })
}
