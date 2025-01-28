import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import {dbConnection} from './mongo.js';

const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json);
    app.use(helmet());
    app.use(morgan('dev'));
}

const configurarRutas = () => {

}

const conectarDB = async() => {
    try {
        await dbConnection();
        console.log('Conexion exitosa a la base de datos')
    } catch (error) {
        console.log('Erro al conectar a la base de datos', error)
    }
}

export const iniciarServidor = async() =>{
    const app = express();
    const port = process.env.PORT || 3000;
    await conectarDB();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port,()=>{
        console.log(`Server running on port ${port}`)
    });
}