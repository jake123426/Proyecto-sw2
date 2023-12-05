const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Practica = dbConexion.define('practica', {
    // Model attributes are defined here
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false        
    },        
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'id'
        }        
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Curso',
            key: 'id'
        }        
    }
},{
    tableName: 'practica',
    timestamps: false
});

module.exports = Practica;