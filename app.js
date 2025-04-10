const path = require('path');
// Determinar el entorno actual (por defecto 'production')
const env = process.env.NODE_ENV === 'development' ? '.dev' : '';

require('dotenv').config({
    path: path.resolve(__dirname, `.env${env}`)
});

const Server = require('./models/server');

const server = new Server();


server.listen();

