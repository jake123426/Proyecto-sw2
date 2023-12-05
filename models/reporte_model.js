const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Reporte = dbConexion.define('reporte', {
    // Model attributes are defined here
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false        
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false        
    }
},{
    tableName: 'reporte',
    timestamps: false
});

module.exports = Reporte;