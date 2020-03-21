import { RequestHandler, Request, Response } from 'express';
import { createPost, updatePost, getPosts, deletePostById } from './post.service';

const create: RequestHandler = async (req: Request, res: Response) => {
    const post = await createPost(req.body);

    res.status(201).json({
        message: 'Saved',
        post
    });
};

const update: RequestHandler = async (req: Request, res: Response) => {
    const post = await updatePost(req.params.id, req.body);

    res.json({
        message: 'Updated',
        post
    });
};

const get: RequestHandler = async (req: Request, res: Response) => {
    const posts = await getPosts(req.query);
    res.send({ posts });
};

const deletePost: RequestHandler = async (req: Request, res: Response) => {
    await deletePostById(req.params.id);
    res.send();
};

export {
    create,
    update,
    get,
    deletePost,
};
