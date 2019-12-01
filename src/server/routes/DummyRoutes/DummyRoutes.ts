import * as express from 'express';
import { DummyService } from '@services'

export const DummyRoutes = (): express.Router => {
    const router: express.Router = express.Router()

    router.get('/', (req: express.Request, res: express.Response, next: Function) => {
        res.json(DummyService())
    })

    return router;
}