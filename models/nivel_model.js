const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Nivel = dbConexion.define('nivel', {
    // Model attributes are defined here
    noombre: {
        type: DataTypes.STRING(50),
        allowNull: false        
    }    
},{
    tableName: 'nivel',
    timestamps: false
});

module.exports = Nivel;