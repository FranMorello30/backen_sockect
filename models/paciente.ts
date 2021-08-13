import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Paciente = db.define('mae_pacientes',{
    Id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    Rut:{
        type:DataTypes.STRING
    },
    Nombres:{
        type:DataTypes.STRING
    },
    Sexo:{
        type:DataTypes.STRING
    },
    FecNacimiento:{
        type:DataTypes.DATEONLY
    },
    Telefonos:{
        type:DataTypes.STRING
    },
    Emails:{
        type:DataTypes.STRING
    },
    FecProxCita:{
        type:DataTypes.DATEONLY
    },
    Hora:{
        type:DataTypes.TIME
    },
    Region:{
        type:DataTypes.STRING
    },
    Comuna:{
        type:DataTypes.STRING
    },
    Direccion:{
        type:DataTypes.STRING
    },
    Prestacion:{
        type:DataTypes.STRING
    },
    Patologia:{
        type:DataTypes.STRING
    },
    Prevencion:{
        type:DataTypes.STRING
    },
    Folio:{
        type:DataTypes.STRING
    },
    FormaPago:{
        type:DataTypes.STRING
    },
    TipoAtencion:{
        type:DataTypes.STRING
    },
    EstadoCita:{
        type:DataTypes.BOOLEAN
    },   
    IdEjecutivo:{
        type:DataTypes.INTEGER
    },
    NomEjecutivo:{
        type:DataTypes.STRING
    },
    UsuConfirmo:{
        type:DataTypes.STRING
    },
    Comentarios:{
        type:DataTypes.TEXT
    },
});

export default Paciente;


