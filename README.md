
# Proyecto CBA_Backend

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2020.18.3-brightgreen)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-%5E4.18.2-blue)](https://expressjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## Requisitos previos

- Node.js (versión 20.18.3 o superior)
- npm (normalmente viene con Node.js)
- Servidor PostgreSQL
- Credenciales de DialogFlow
- API Key de OpenAI

## Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jake123426/Proyecto-sw2.git
   ```
2. Crear en el directorio raiz el archivo `.env` y `.env.development` para desarrollo, posteriomente establecer las variables de entorno.
3. Instalar paquetes:
    ```bash
    npm ci
    ```
4. Ejecutar servidor en modo desarrollo para sistemas Windows:
    ```bash
    npm run dev:win
    ```
    - Para entornos Linux/Mac:
        ```bash    
        npm run dev
        ```
    - Opcionalmente se puede usar el paquete cross-env (recomendado - funciona en todos los sistemas)    
        ```bash
        npm install cross-env --save-dev
        ```
    - Luego en tu package.json:
        ```
        "scripts": {
        "start": "node app",
        "dev": "cross-env NODE_ENV=development nodemon app"
        }
        ```
- Ejecutar test:
    ```bash
    npm run test
    ```