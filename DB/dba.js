
const B1 = "Do you enjoy reading books?;Where does she work?;What time does the store close?;How often do you exercise?;Does he speak French?;What do you usually eat for breakfast?;Where do they live?;Do you play any musical instruments?;How often does it rain in this city?;Does your cat like to sleep in the afternoon?";
const B2 = "Where did you go on your last vacation?;Did you finish your homework yesterday?;What time did the movie start last night?;Who did you meet at the party on Saturday?;How was your weekend?;Did you watch the game on TV?;Where did she study English?;Did they visit their grandparents last month?;What did you cook for dinner?;How many books did you read last week?"
const B3 = "What will you do after you finish work today?;When will you travel to Europe?;Will they attend the conference next month?;What time will the movie start tomorrow?;Where will you go on your next vacation?;Will she take the exam next week?;What will you study in college?;When will the new restaurant open?;Will he call you later?;What time will the concert end on Friday?"
const B4 = "How often do you go to the gym?;What do you usually eat for breakfast?;Where does your best friend live?;Do you like to watch movies?;How often does it snow in your city?;What time does your favorite TV show start?;Where do you work or study?;Does your dog enjoy playing fetch?;How often do you check your emails?;What languages do you speak?"
const B5= "Where did you spend your last vacation?;Did you watch any movies over the weekend?;How was your last birthday celebration?;Did you meet any interesting people at the event?;What did you do yesterday evening?;Where did you go for dinner last Saturday?;Did you visit any historical places during your last trip?;How did you learn to cook?;Did you have any pets when you were a child?;What was the last book you read?"
const B6 = "How long will it take you to finish the project?;Will you be going to the gym tomorrow?;What will you be doing this time next year?;Will they have dinner together tonight?;When will the new product be launched?;Will she ever visit that country?;What time will the event start on Friday?;Will you have time to complete the task before the deadline?;Where will you be traveling for your next holiday?;Will he remember to bring the documents to the meeting?"




function seleccionarPreguntasAleatorias(objetoPreguntas) {
    const preguntasAleatorias = {};
    const maxPreguntas = 5; // Número de preguntas a seleccionar
  
    for (let categoria in objetoPreguntas) {
      const preguntasCategoria = objetoPreguntas[categoria];
      const preguntasKeys = Object.keys(preguntasCategoria);
      const preguntasSeleccionadas = {};
  
      // Generar índices aleatorios únicos para seleccionar preguntas
      const preguntasIndicesAleatorios = [];
      while (preguntasIndicesAleatorios.length < maxPreguntas) {
        const indiceAleatorio = Math.floor(Math.random() * preguntasKeys.length);
        if (!preguntasIndicesAleatorios.includes(indiceAleatorio)) {
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
  
  const cuestionarioArray = [
    {
      id: 1,
      texto: 'Do you enjoy reading books?;Where does she work?;What time does the store close?;How often do you exercise?;Does he speak French?;What do you usually eat for breakfast?;Where do they live?;Do you play any musical instruments?;How often does it rain in this city?;Does your cat like to sleep in the afternoon?'
    },
    {
      id: 2,
      texto: 'Where did you go on your last vacation?;Did you finish your homework yesterday?;What time did the movie start last night?;Who did you meet at the party on Saturday?;How was your weekend?;Did you watch the game on TV?;Where did she study English?;Did they visit their grandparents last month?;What did you cook for dinner?;How many books did you read last week?'
    },
    {
      id: 3,
      texto: 'What will you do after you finish work today?;When will you travel to Europe?;Will they attend the conference next month?;What time will the movie start tomorrow?;Where will you go on your next vacation?;Will she take the exam next week?;What will you study in college?;When will the new restaurant open?;Will he call you later?;What time will the concert end on Friday?'
    }
  ]
  const objeto = {};
  const nroModulos = 3;
  
  for (let i = 1; i <= nroModulos; i++) {
      objeto[`B${i}`] = {};
      var preguntas = cuestionarioArray[i-1].texto
      var preguntasArray = preguntas.split(';');
      preguntasArray.forEach((pregunta, index) => {
          objeto[`B${i}`][`${index + 1}`] = pregunta.trim();
      });
  
  }
  
  const preguntasAleatorias = seleccionarPreguntasAleatorias(objeto);
  console.log( preguntasAleatorias );
  
  
  function extraerPreguntas( preguntas ){
    const preguntasExtraidas = {};
    let contador = 0;
    for (const clave in preguntas ) {
      if (contador < 2) {
        preguntasExtraidas[clave] = cuestionario[clave];
        delete cuestionario[clave];
        contador++;
      } else {
        break;
      }
    }
    return preguntasExtraidas;    
}
  



// Extraer las dos primeras preguntas de 'B1'
const preguntasExtraidas = {};
let contador = 0;

for (const clave in cuestionario['B1']) {
  if (contador < 2) {
    preguntasExtraidas[clave] = cuestionario['B1'][clave];
    delete cuestionario['B1'][clave];
    contador++;
  } else {
    break;
  }
}

console.log('Preguntas extraídas:', preguntasExtraidas);
console.log('Cuestionario actualizado:', cuestionario['B1']);



