const { response, request } = require('express');
const { Op } = require("sequelize");

const Usuario = require('../models/usuario_model')
const Inscipcion = require('../models/inscripcion_model')

const reporteGet = async ( req = request, res = response ) => {    
    
    // let alumnosCant = await Usuario.count({ where: { tipo: "alumno"}});
    // let inscritos = await Inscipcion.count({ where : { fecha: {
    //     [Op.between]: ['2023-12-01', '2023-12-31'],
    // }}});        
    Promise.all([
        Usuario.count({ where: { tipo: "alumno"}}),
        Inscipcion.count({ where : { fecha: { [Op.between]: ['2023-12-01', '2023-12-31'] }}}),
        Inscipcion.count({ where : { fecha: { [Op.not]: { [Op.between]: ['2023-12-01', '2023-12-31'] }}}}),
    ])
    .then(([ cantAlumnos, cantInscritos, abandono ]) => {        
        res.status(200).json({ 
            cantAlumnos,
            cantInscritos,
            abandono
        });        
    })
    .catch((error) => {
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    });
}

module.exports = {
    reporteGet
}