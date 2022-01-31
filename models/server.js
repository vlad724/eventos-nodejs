const express = require('express');
const db = require('../database/connection');
const fileUpload = require('express-fileupload');

const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPaths = {
            auth: '/api/auth',
            usuarios: '/api/clientes',
            eventos: '/api/eventos',
            uploads: '/api/uploads'
        }

        //middlewares
        this.middlewares();

        // conexion a la bd
        this.dbConnection();

        //rutas
        this.routes();

    }
    async dbConnection() {



        try {

            await db.authenticate();
            console.log('base de datos online');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        this.app.use(cors());

        //lectura body
        this.app.use(express.json());

        //carpeta publica
        this.app.use(express.static('public'));

        //fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp',
            createParentPath: true
        }))
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, require('../routes/cliente'));
        this.app.use(this.apiPaths.auth, require('../routes/auth'));
        this.app.use(this.apiPaths.eventos, require('../routes/evento'));
        this.app.use(this.apiPaths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en: ', this.port);
        });
    }

}


module.exports = Server;