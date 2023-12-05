const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Modulo = dbConexion.define('modulo', {
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
    tableName: 'modulo',
    timestamps: false
});

module.exports = Modulo;