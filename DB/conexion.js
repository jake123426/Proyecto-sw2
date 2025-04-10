const { Sequelize } = require('sequelize');


const dbConexion = new Sequelize( process.env.DB_URI , {
    dialect: 'postgres'
});
// const dbConexion = new Sequelize( 'db_cba', 'postgres', '12345', {
//         host : 'localhost',
//         dialect: 'postgres'
// });

module.exports = {
    dbConexion
}