const { Sequelize } = require('sequelize');

const dbConexion = new Sequelize( process.env.PRODUCTION_DB, 'postgres', process.env.PRODUCTION_PASSWORD, {
        host: process.env.PRODUCTION_HOST,
        dialect: 'postgres'
    });
// const dbConexion = new Sequelize( 'db_cba', 'postgres', '12345', {
//         host : 'localhost',
//         dialect: 'postgres'
// });

module.exports = {
    dbConexion
}