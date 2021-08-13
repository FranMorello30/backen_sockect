import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Usuario = db.define('login',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    nombre:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.BOOLEAN
    },
    password:{
        type:DataTypes.TEXT
    }
});

export default Usuario;


