import express from 'express'
import { DummyRoutes } from './routes'
import * as bodyParser from 'body-parser'

export const startServer = (port: number): void => {
    const server: express.Application = express()
    server.use('/', bodyParser.json(), bodyParser.urlencoded({ extended: true, type: 'application/json' }))
    
    // Add routes here
    server.use('/', DummyRoutes())

    server.listen(port, () => console.log(`Server listening on ${port}...`))
}