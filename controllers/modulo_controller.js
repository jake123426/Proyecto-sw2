const { response, request } = require('express');

const Modulo = require('../models/modulo_model')

const moduloGet = async ( req = request, res = response ) => {    
    try {
        let modulos = await Modulo.findAll();
        res.status(200).json( modulos );        
    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }
}

module.exports = {
    moduloGet   
}