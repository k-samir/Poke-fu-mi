import express from 'express'
import * as routes from './routes'
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express()

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'USER MicroserviceAPI for Poke-fu-mi',
            version: '1.0.0',
            description:
                'This is the USER Microservice'
        },
        servers: [
            {
                url: 'http://localhost:5003',
                description: 'USER Microservice',
            }
        ]
     
    }, 
    apis: ['**/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routes.register(app)

export {app};
