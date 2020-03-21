import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';
import handleErrorMiddleware from './middleware/handle-error-middleware';

import * as PostController from './post/post.controller';

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
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
