import { Router, Request, Response, NextFunction } from 'express';

export const DummyRoutes = (): Router => {
    const router: Router = Router()

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.json({
            status: "SUCCESS"
        })
    })

    return router;
}