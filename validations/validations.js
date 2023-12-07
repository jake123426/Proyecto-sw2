
const validator = require('validator');

const esFechaValida = ( value ) => {
    if ( !value ){
        throw new Error('La campo fecha es obligatorio');
    }

    if ( !validator.isISO8601(value) ) {
        throw new Error('La fecha no tiene un formato valido');
    }
    return true;
}

const esTipoValido = (value) => {
    return ['estudiante', 'profesor'].includes(value);
};



module.exports = { 
    esTipoValido,
    esFechaValida    
};