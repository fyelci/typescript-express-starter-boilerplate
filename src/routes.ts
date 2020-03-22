import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./openapi.yaml');
import handleErrorMiddleware from './middleware/handle-error-middleware';

import * as PostController from './controllers/post.controller';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Post routes
router.post('/posts', handleErrorMiddleware(PostController.create));
router.put('/posts/:id', handleErrorMiddleware(PostController.update));
router.get('/posts', handleErrorMiddleware(PostController.get));
router.delete('/posts/:id', handleErrorMiddleware(PostController.deletePost));

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(swaggerDocument, swaggerUiOptions));
}

export default router;
