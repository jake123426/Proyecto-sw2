const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Cuestionario = dbConexion.define('cuestionario', {
    // Model attributes are defined here
    topico: {
        type: DataTypes.STRING(255),
        allowNull: false        
    },        
    texto: {
        type: DataTypes.TEXT,
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
    tableName: 'cuestionario',
    timestamps: false
});

module.exports = Cuestionario;