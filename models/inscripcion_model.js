const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Inscripcion = dbConexion.define('inscripcion', {
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
    }
},{
    tableName: 'inscripcion',
    timestamps: false
});

module.exports = Inscripcion;