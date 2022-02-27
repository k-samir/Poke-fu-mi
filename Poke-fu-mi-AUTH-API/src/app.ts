import express from 'express'
import * as routes from './routes'
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express()
const jwt = require('jsonwebtoken')

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth MicroserviceAPI API for Poke-fu-mi',
            version: '1.0.0',
            description:
                'This is the Auth Microservice'
        },
        servers: [
            {
                url: 'http://localhost:5002',
                description: 'AUTH Microservice',
            }
        ]
     
    }, 
    apis: ['**/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routes.register(app)

export { app };
