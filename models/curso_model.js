const { DataTypes } = require('sequelize')
const { dbConexion } = require('../DB/conexion')

const Curso = dbConexion.define('curso', {
    // Model attributes are defined here
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false        
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
    tableName: 'curso',
    timestamps: false
});

module.exports = Curso;