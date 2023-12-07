const { response, request } = require('express');

const { consultaChatGPT } = require('../helpers/openaiUtils');



const consultaGet = async (req = request, res = response) => {

    
    var respuesta = await consultaChatGPT( req.body.consulta );

    res.status(200).json({
        'respuesta' : respuesta
    });
}



module.exports = {
    consultaGet   
}