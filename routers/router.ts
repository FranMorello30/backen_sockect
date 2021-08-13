import { Router,Request,Response } from 'express';
import { getPacientes,actPaciente,citaPaciente } from '../controllers/pacientes';
import { loginUsuario,crearUsuario } from '../controllers/auth';

import Server from '../class/server';
//import { usuariosConectados,mapa } from '../sockets/socket';
//import { GraficaData } from '../class/grafica';
//import { EncuestaData } from '../class/encuesta';
//import { Mapa } from '../class/mapa';

import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

//const grafica = new GraficaData();
//const encuesta = new EncuestaData();


/*
router.get('/mapa', (req:Request,res:Response ) => 
{
    res.json(mapa.getMarcadores());
});
router.get('/encuesta', (req:Request,res:Response ) => 
{
    res.json(encuesta.getDataEncuesta())
});
router.post('/encuesta', (req:Request,res:Response ) => 
{
    const pos = Number(req.body.posicion);
    const unidades = Number(req.body.voto);

    encuesta.incremetarValor(pos,unidades)
    
    const server = Server.instance;
    server.io.emit('cambio-encuesta',encuesta.getDataEncuesta());

    res.json(encuesta.getDataEncuesta())
});
router.get('/grafica', (req:Request,res:Response ) => 
{
    res.json(grafica.getDataGrafica())
});
router.post('/grafica', (req:Request,res:Response ) => 
{
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);

    grafica.incremetarValor(mes,unidades)
    
    const server = Server.instance;
    server.io.emit('cambio-grafica',grafica.getDataGrafica());

    res.json(grafica.getDataGrafica())
});
router.post('/mensajes', (req:Request,res:Response ) => 
{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }
    
    const server = Server.instance;
    server.io.emit('mensaje-nuevo',payload);

    res.json({
        ok:true,
        mensaje:'Todo esta bien post',
        cuerpo,
        de
    })
});
router.post('/mensajes/:id', (req:Request,res:Response ) => 
{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado',payload);

    res.json({
        ok:true,        
        cuerpo,
        de,
        id
    })
});
// servicio para obtener todos los id de los usuarios
router.get('/usuarios', (req:Request,res:Response ) => 
{
    const server = Server.instance;

    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
});*/

//login usuarios
router.post('/auth',
    [
        check('email','el correo es obligatorio').isEmail(),
        check('password','la contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    loginUsuario
);
//crear nuevo usuario
router.post('/crear-usuario',
    [
        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('email','el correo es obligatorio').isEmail(),
        check('password','la contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearUsuario
);
// obtener todos los pacientes
router.get('/lista-pacientes',
    [
        validarJWT
    ],
    getPacientes
);
//actualizar paciente
router.post('/actualizar-paciente',
    [
        validarJWT,
        check('rut','el rut es obligatorio').not().isEmpty(),
        check('email','el correo es obligatorio').isEmail(),
        check('password','la contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    actPaciente
);

router.put('/cita-paciente/:idPaciente',
    [
        validarJWT,

        check('fecha','la fecha es obligatorio').not().isEmpty(),
        check('confCita','estado cita es obligatorio').not().isEmpty(),
        
        validarCampos
    ],
    citaPaciente
);

export default router

