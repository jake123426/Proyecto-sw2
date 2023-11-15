const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 3000;
        this.consultasPath = '/api/consulta';
        this.dialogflowPath = '/api/dialogflow';

        // Conectar a base de datos
        //this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    // async conectarDB() {
    //     await dbConnection();
    // }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        // this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.consultasPath, require('../routes/consulta_route'));
        this.app.use( this.dialogflowPath, require('../routes/dialogflow_route'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;