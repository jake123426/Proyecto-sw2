const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Prueba = dbConexion.define('prueba', {
    // Model attributes are defined here
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false        
    },        
    nota: {
        type: DataTypes.INTEGER,
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
    modulo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Modulo',
            key: 'id'
        }        
    }
},{
    tableName: 'prueba',
    timestamps: false
});

module.exports = Prueba;