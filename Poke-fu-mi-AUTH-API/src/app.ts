import express from 'express'
import * as routes from './routes'

const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
routes.register(app)

export {app};
