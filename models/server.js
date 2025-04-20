const express = require('express');
const cors = require('cors');
const { dbConexion } = require('../DB/conexion');

class Server {

    constructor({ db_conection = true} = {}) {
        this.app  = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV;
        this.db_conection = db_conection;
        this.consultasPath = '/api/consulta';
        // this.dialogflowPath = '/api/dialogflow';
        this.pruebaPath = '/api/prueba';
        this.cuestionarioPath = '/api/cuestionario';
        this.usuarioPath = '/api/usuarios';
        this.moduloPath = '/api/modulos';
        this.reportePath = '/api/reporte';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        if ( this.db_conection ){
            try {
                await dbConexion.authenticate();
                console.log('Base de Datos Online');
            } catch (error) {
                console.error('No se pudo conectar a la BD:', error);
            }
        }
    }


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
        // this.app.use( this.dialogflowPath, require('../routes/dialogflow_route'));
        this.app.use( this.pruebaPath, require('../routes/prueba_route'));
        this.app.use( this.cuestionarioPath, require('../routes/cuestionario_route'));
        this.app.use( this.usuarioPath, require('../routes/usuario_route'));
        this.app.use( this.moduloPath, require('../routes/modulo_route'));
        this.app.use( this.reportePath, require('../routes/reporte_route'));
        this.app.get('/health', (req, res) => {
        res.status(200).json({ 
            status: 'OK',
            msg: `Servidor en entorno '${this.env}' escuchando en puerto ${this.port}`
        });
        });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor en entorno '${this.env}' escuchando en puerto ${this.port}`);
        });
    }

}




module.exports = Server;