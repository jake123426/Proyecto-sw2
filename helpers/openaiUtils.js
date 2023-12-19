const { OpenAI } = require("openai");


const consultaChatGPT =  async ( prompt ) => {    
    // const configuration = new Configuration({
    //     apiKey: process.env.OPENAI_API_KEY,
    // });
    const openai = new OpenAI({
        // organization: "org-TQi1Y22gsOyDgue21LK8R2m1",
        apiKey: process.env.OPENAI_API_KEY,
    });    
    
    
    const apiRequestBody = {
        model: "gpt-3.5-turbo",        
        messages: [{ "role": "user", "content": prompt }],
        temperature: 0.6,
    };
    const chatCompletion  = await openai.chat.completions.create( apiRequestBody );    
    
    // const completionResp = completion.data.choices[0].message.content;    
    return chatCompletion.choices[0].message.content;
    
}

const validarPregunta = async ( pregunta, respuesta ) => {
    
    let prompt = `Respóndeme solamente con un true o false sí para la siguiente pregunta en ingles: '${pregunta}', la siguiente respuesta es semanticamente y gramaticalmente correcta: '${respuesta}' `;    
    console.log(prompt);        
    let resultado = await consultaChatGPT( prompt );
    console.log("LAS REPUESTA ES: " , resultado);
    let res = resultado.toLowerCase();
        
    if ( res.includes("true") === true){         
        return true;
    } else {           
        return false;
    }    
}

const elaborarCuestionario = ( cuestionario, modulos ) => {
    var cuestionarioArray = cuestionario.map((registro) => ({
        id: registro.id,
        texto: registro.texto        
    }));
    const objeto = {};
    const nroModulos = modulos;  
    for (let i = 1; i <= nroModulos; i++) {
        objeto[`B${i}`] = {};
        var preguntas = cuestionarioArray[i-1].texto
        var preguntasArray = preguntas.split(';');
        preguntasArray.forEach((pregunta, index) => {
            objeto[`B${i}`][`${index + 1}`] = pregunta.trim();
        });        
    }
    let preguntasAleatorias = seleccionarPreguntasAleatorias( objeto );
    return preguntasAleatorias;
}

const seleccionarPreguntasAleatorias = ( objetoPreguntas ) => {
    const preguntasAleatorias = {};
    const maxPreguntas = 5; // Número de preguntas a seleccionar

    for (let categoria in objetoPreguntas) {
        const preguntasCategoria = objetoPreguntas[categoria];
        const preguntasKeys = Object.keys(preguntasCategoria);
        const preguntasSeleccionadas = {};
        // Generar índices aleatorios únicos para seleccionar preguntas
        const preguntasIndicesAleatorios = [];
        while ( preguntasIndicesAleatorios.length < maxPreguntas ) {
            const indiceAleatorio = Math.floor(Math.random() * preguntasKeys.length);
            if ( !preguntasIndicesAleatorios.includes(indiceAleatorio) ) {
                preguntasIndicesAleatorios.push(indiceAleatorio);
            }
        }
        // Extraer y asignar preguntas aleatorias a la nueva estructura de datos
        preguntasIndicesAleatorios.forEach((indice) => {
            const clave = preguntasKeys[indice];
            preguntasSeleccionadas[clave] = preguntasCategoria[clave];
        });
        // Agregar las preguntas seleccionadas a la nueva estructura por categoría
        preguntasAleatorias[categoria] = preguntasSeleccionadas;
    }    
    return preguntasAleatorias;
}

const extraerPregunta = ( preguntas, modulo ) => {
    let clave = Object.keys( preguntas[`B${modulo}`] )[0]
    let pregunta = preguntas[`B${modulo}`][ clave ];
    delete preguntas[`B${modulo}`][ clave ];
    return pregunta;
}

module.exports = {
    consultaChatGPT,
    validarPregunta,
    elaborarCuestionario,
    extraerPregunta
}