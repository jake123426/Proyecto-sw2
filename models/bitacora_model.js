const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Bitacora = dbConexion.define('bitacora', {
    // Model attributes are defined here
    accion: {
        type: DataTypes.STRING(255),
        allowNull: false        
    },
    descipcion: {
        type: DataTypes.STRING(255),
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
},{
    tableName: 'bitacora',
    timestamps: false
});

module.exports = Bitacora;