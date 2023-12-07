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

module.exports = {
    usuarioGet   
}