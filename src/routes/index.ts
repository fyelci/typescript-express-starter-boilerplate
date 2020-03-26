import logger from '../utils/logger';
import { NextFunction, Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./openapi.yaml');
import { PingRoute } from './ping.route';
import { PostRoute } from './post.route';

export class ApiRoutes {
    public static path = '/api';
    private static instance: ApiRoutes;
    private router = Router();

    private constructor() {
        logger.info('[ApiRoute] Creating api routes.');

        this.router.get('/', this.get);
        this.router.use(PingRoute.path, PingRoute.router);
        this.router.use(PostRoute.path, PostRoute.router);

        // Dev routes
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'stage') {
            const swaggerUiOptions = {
                customCss: '.swagger-ui .topbar { display: none }'
            };

            this.router.use('/dev/api-docs', swaggerUi.serve);
            this.router.get('/dev/api-docs', swaggerUi.setup(swaggerDocument, swaggerUiOptions));
        }
    }

    static get router() {
        if (!ApiRoutes.instance) {
            ApiRoutes.instance = new ApiRoutes();
        }
        return ApiRoutes.instance.router;
    }

    private get = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ online: true });
        next();
    };
}
