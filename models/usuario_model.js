const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Usuario = dbConexion.define('usuario', {
    // Model attributes are defined here
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false        
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false        
    },
    telefono: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(50)
    }
},{
    tableName: 'usuario',
    timestamps: false
});

module.exports = Usuario;