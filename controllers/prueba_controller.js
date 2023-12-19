const { response, request } = require('express');

const Usuario = require('../models/usuario_model');
const Modulo = require('../models/modulo_model')
const Cuestionario = require('../models/cuestionario_model');

const { validarPregunta, elaborarCuestionario, extraerPregunta } = require('../helpers/openaiUtils');

/*
    Variables
*/
let modulo = 3;
let nivelActual = 1;
let cantPreguntas = 0;
let cuestionario = {}; 
let preguntaActual = "";


const pruebaInit = async ( req = request, res = response ) => {   
    const { cant } = req.params;    
    try {
        modulo = cant;
        nivelActual = 1;
        cantPreguntas = 0;
        cuestionario = {}; 
        preguntaActual = "";
        let preguntas = await Cuestionario.findAll({ 
            limit: cant, 
            order: [['id', 'ASC']]
        })
        let preguntasAleatorias = elaborarCuestionario( preguntas, cant );
        cuestionario = preguntasAleatorias;
        preguntaActual = extraerPregunta( cuestionario, nivelActual );
        cantPreguntas++;        
        res.status(200).json({ 
            preguntaActual,
            cuestionario 
        });
    } catch ( error ) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un problema, intentalo mas tarde'
        })
    }
    
}

const siguientePregunta = async ( req = request, res = response ) => {    
    const { respuesta } = req.body 
    try {        
        let resultado = await validarPregunta( preguntaActual, respuesta );
        if ( resultado  === true) {            
            if ( cantPreguntas >= 2 ) {
                nivelActual++;
                cantPreguntas = 0;
                if ( nivelActual > modulo ){ 
                    res.status(200).json({
                        msg: "Prueba finalizada",
                        resultado: `B${modulo}`
                    });
                } else {
                    cantPreguntas++;
                    preguntaActual = extraerPregunta( cuestionario, nivelActual );                    
                    res.status(200).json({ 
                        preguntaActual,
                        cuestionario 
                    });
                }
            } else {
                cantPreguntas++;
                preguntaActual = extraerPregunta( cuestionario, nivelActual );                    
                res.status(200).json({ 
                    preguntaActual,
                    cuestionario 
                });
            }
        } else {                        
            nivelActual--;
            cantPreguntas = 0;
            if ( nivelActual < 1 ){
                res.status(200).json({
                    msg: "Prueba finalizada",
                    resultado: `B1`
                });
            } else {
                modulo = nivelActual;
                cantPreguntas++;
                preguntaActual = extraerPregunta( cuestionario, nivelActual );                    
                res.status(200).json({ 
                    preguntaActual,
                    cuestionario 
                });
            }
        }        
    } catch ( error ) {
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
    pruebaInit,
    siguientePregunta  
}