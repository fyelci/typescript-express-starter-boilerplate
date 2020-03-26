import logger from '../utils/logger';
import { NextFunction, Request, Response, Router } from 'express';
import {createPost, deletePostById, getPosts, updatePost} from "../repositories/post.repository";
import handleError from '../middleware/handle-error-middleware';

export class PostRoute {
    public static path = '/posts';
    private static instance: PostRoute;
    private router = Router();

    private constructor() {
        logger.info('[PingRoute] Creating ping route.');

        this.router.get('/', handleError(this.get));
        this.router.post('/', handleError(this.create));
        this.router.put('/:id', handleError(this.update));
        this.router.delete('/:id', handleError(this.delete));
    }

    static get router() {
        if (!PostRoute.instance) {
            PostRoute.instance = new PostRoute();
        }
        return PostRoute.instance.router;
    }

    private create = async (req: Request, res: Response, next: NextFunction) => {
        const post = await createPost(req.body);

        res.status(201).json({
            message: 'Saved',
            post
        });
        next();
    };

    private update = async (req: Request, res: Response, next: NextFunction) => {
        await updatePost(req.params.id, req.body);

        res.json({
            message: 'Updated'
        });
        next();
    };

    private get = async (req: Request, res: Response, next: NextFunction) => {
        const posts = await getPosts(req.query);
        res.send({ posts });
        next();
    };

    private delete = async (req: Request, res: Response, next: NextFunction) => {
        await deletePostById(req.params.id);
        res.send({message: 'OK'});
        next();
    };
}
