const { Sequelize } = require('sequelize');

const dbConexion = new Sequelize( 
    process.env.PRODUCTION_DB || 'db_cba', 
    'postgres', 
    process.env.PRODUCTION_PASSWORD || '12345', {
        host: process.env.PRODUCTION_HOST || 'localhost',
        dialect: 'postgres'
    });

module.exports = {
    dbConexion
}