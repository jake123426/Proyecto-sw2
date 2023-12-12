const { response, request } = require('express');

const Usuario = require('../models/usuario_model')

const usuarioGet = async ( req = request, res = response ) => {    
    try {
        let usuarios = await Usuario.findAll();
        res.status(200).json( usuarios );        
    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }
}

const usuarioCreate = async(req, res = response) => {
    
    const { nombre, correo, telefono } = req.body
    const tipo = 'alumno';
    try {        
        var estudiante = await Usuario.create({ 
            nombre, correo, telefono, tipo
        })        
        res.status(200).json({
            msg: 'El estudiante ha sido registrado',
            estudiante            
        })

    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }

}
const usuarioUpdate = async(req, res = response) => {    
    const { id } = req.params;
    const { nombre, correo, telefono } = req.body 
    console.log(req.body)   
    try {
        let estudiante = await Usuario.findByPk( id );    
        if ( !estudiante ){
            res.status(400).json({
                msg: 'No se encuentra registrado el estudiante con ese ID'
            })
        }
        console.log(estudiante.nombre)
        estudiante.nombre = nombre ?? estudiante.nombre;
        estudiante.correo = correo ?? estudiante.correo;
        estudiante.telefono = telefono ?? estudiante.telefono;
        console.log(estudiante.nombre)
        await estudiante.save();     
        res.status(200).json({
            msg: 'El estudiante ha sido actualizado',
            estudiante            
        })
    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }

}

const usuarioGetEstudiantes = async ( req = request, res = response ) => {       
    try {
        let estudiantes = await Usuario.findAll({ where : { tipo : 'alumno' }});
        res.status(200).json( estudiantes );        
    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }
}

const usuarioGetOne = async ( req = request, res = response ) => {   
    const { id } = req.params;    
    try {        
        let usuario = await Usuario.findByPk( id );
        if ( !usuario ){
            res.status(400).json({
                msg: 'No existe el usuario solicitado'
            })
        }       
        res.status(200).json( usuario );
    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }
    
}

module.exports = {
    usuarioGet,
    usuarioGetEstudiantes,
    usuarioGetOne,
    usuarioCreate,
    usuarioUpdate   
}