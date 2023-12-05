const { Sequelize } = require('sequelize');

const dbConexion = new Sequelize('db_cba', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = {
    dbConexion
}