import {Request,Response} from 'express';
import Paciente from '../models/paciente';


export const getPacientes = async (req:Request,res:Response) =>{
    
    const pacientes = await Paciente.findAll();

    res.json({
        pacientes
    })
}
export const actPaciente = async(req:Request,res:Response) =>{
    
    const datosPacientes = req.body;
    const { idPaciente } = req.params;

    try {

        const existePaciente = await Paciente.findByPk(idPaciente);

        if(existePaciente)
        {
            await existePaciente.update(datosPacientes);
            res.json({
                existePaciente
            })
        }else{
            return res.status(400).json({
                msg:`El paciente rut: ${datosPacientes.Rut} no existe hable con el administrador`          
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Hable con el administrador',            
        })
    }    
}
export const citaPaciente = async(req:Request,res:Response) =>{
    
    const { fecha,hora,confCita } = req.body;
    const { idPaciente } = req.params;

    const cita = (confCita == 'SI' ) ? true : false;

    console.log(fecha,hora);

    try {

        const existePaciente = await Paciente.findByPk(idPaciente);

        if(existePaciente)
        {
            await existePaciente.update({
                FecProxCita:fecha,
                Hora:hora,
                EstadoCita:cita
            });
            res.json({
                existePaciente
            })
        }else{
            return res.status(400).json({
                msg:`ha ocurrido un error al intentar agendar cita, hable con el administrador`          
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Hable con el administrador',            
        })
    }    
}
