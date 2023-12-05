const { DataTypes } = require('sequelize');
const { dbConexion } = require('../DB/conexion');

const InscripcionCurso = dbConexion.define('inscripcioncurso', {
    inscripcion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
        model: 'Inscripcion', 
        key: 'id',
        },
    },
    curso_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
        model: 'Curso', 
        key: 'id', 
        },
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    }, {
        tableName: 'inscripcioncurso',
        timestamps: false
});

module.exports = InscripcionCurso;
