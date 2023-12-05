const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Recurso = dbConexion.define('recurso', {
    // Model attributes are defined here
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false        
    },        
    nivel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Nivel',
            key: 'id'
        }        
    },
},{
    tableName: 'recurso',
    timestamps: false
});

module.exports = Recurso;