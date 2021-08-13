import { Sequelize } from 'sequelize'


const db = new Sequelize('ctc_cl_oncovida','oncovida_ctc','*BdCtcONcovida456***',{
    
    host:'162.248.54.139',
    dialect:'mysql',
    port: 3306,    
    define: { 
        freezeTableName: true, 
        charset: 'utf8',        
    },
    pool: {
        max: 50,
        min: 0,
        idle: 1000000
    },
        
});



export default db