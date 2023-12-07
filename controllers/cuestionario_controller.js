const { response, request } = require('express');

const Usuario = require('../models/usuario_model');
const Modulo = require('../models/modulo_model')
const Cuestionario = require('../models/cuestionario_model');

const cuestionarioGet = async ( req = request, res = response ) => {    
    try {
        let cuestionario = await Cuestionario.findAll();
        res.status(200).json( cuestionario );        
    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }
}

const cuestionarioGetOne = async ( req = request, res = response ) => {   
    const { id } = req.params;    
    try {        
        let cuestionario = await Cuestionario.findByPk( id );
        if ( !cuestionario ){
            res.status(400).json({
                msg: 'No existe el cuestionario especificado'
            })
        }       
        res.status(200).json( cuestionario );
    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }
    
}

const cuestionarioCreate = async ( req = request, res = response ) => {   
    
    const { topico,  texto, usuario_id, modulo_id } = req.body    
    try {        
        validarID( usuario_id, "usuario", res );
        validarID( modulo_id, "modulo", res );        

        var cuestionario = await Cuestionario.create({ 
            topico, texto, usuario_id, modulo_id
        })
        
        res.status(200).json({
            msg: 'El cuestionario ha sido creado',
            cuestionario            
        })

    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }
    
}

const cuestionarioUpdate = async(req, res = response) => {
    const { id } = req.params;        
    const { topico, texto, usuario_id, modulo_id } = req.body    
    
    try {
        if ( usuario_id ) validarID( usuario_id, "usuario", res );
        if ( modulo_id ) validarID( modulo_id, "modulo", res );

        var cuestionario = await Cuestionario.findByPk( id );    
        if ( !cuestionario ){
            res.status(400).json({
                msg: 'No existe el cuestionario'
            })
        }
        cuestionario.topico = topico ?? cuestionario.topico;
        cuestionario.texto = texto ?? cuestionario.texto;
        cuestionario.usuario_id = usuario_id ?? cuestionario.usuario_id;
        cuestionario.modulo_id = modulo_id ?? cuestionario.modulo_id;

        await cuestionario.save()     
        res.status(200).json({
            msg: 'El cuestionario ha sido actualizado',
            cuestionario            
        })
    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }

}

const validarID = async ( id, modelo, res ) => {
    switch ( modelo ){
        case "usuario":
            const usuario = await Usuario.findByPk( id );
            if ( !usuario ){
                res.status(400).json({
                    msg: 'No existe el usuario'
                })
            };
            break;
        case "modulo":
            const moudulo = await Modulo.findByPk( id );
            if ( !moudulo ){
                res.status(400).json({
                    msg: 'No existe el modulo'
                })
            };
            break;        
        default:
            res.status(400).json({
                msg: 'Ocurrio un problema al verificar las llaves primarias'
            });            
    }    
    
}

module.exports = {
    cuestionarioGet,
    cuestionarioGetOne,    
    cuestionarioCreate,
    cuestionarioUpdate   
}