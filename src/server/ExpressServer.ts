import express from 'express'
import { DummyRoutes } from './routes'
import bodyParser from 'body-parser'

export default class ExpressServer {

    private static app: express.Application = express()

    /**
     * This is where you'll define your route tree. Typically you would match your folder with your routes.
     * Here you can define your base level api routes
     */
    private static setupRoutes(): void {
        this.app.use('/dummy', DummyRoutes())
    }

    /**
     * Initializes route tree and starts server on designated port
     * 
     * @param port - port number for server to listen on
     */
    public static startServer(port: number): void {

        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))

        this.setupRoutes()
        // DummyService.log();
        this.app.listen(port, () => console.log(`Server listening on port: ${port}...`))
    }
}