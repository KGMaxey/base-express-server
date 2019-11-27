import * as express from 'express';
import { temp } from '@services'

export const DummyRoutes = (): express.Router => {
    const router: express.Router = express.Router()

    router.get('/', (req: express.Request, res: express.Response, next: Function) => {
        res.json(temp())
    })

    return router;
}