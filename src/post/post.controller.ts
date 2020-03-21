import { RequestHandler } from 'express';
import handleErrorMiddleware from '../middleware/handle-error-middleware';
import PostModel from './post.model';

const create: RequestHandler = handleErrorMiddleware(async (req, res) => {
    const {
        title, author, totalPages, publishDate
    } = req.body;

    const post = new PostModel({ title, author, totalPages, publishDate });
    await post.save();

    res.status(201).json({
        message: 'Saved',
        post
    });
});

const get: RequestHandler = handleErrorMiddleware(async (req, res) => {
    const posts = await PostModel.find();
    res.send({ posts });
});

/**
 * Builds a mongoose query object to search posts according to post title and author name.
 * @param title String containing the post title or part of the post's title
 * @param author String containing the author name or part of the author's name
 */
const buildPostSearchQuery = (title: string, author: string) => {
    const query: any = {};
    if (title) {
        query.title = new RegExp(`.*${title}.*`, 'i');
    }
    if (author) {
        query.author = new RegExp(`.*${author}.*`, 'i');
    }

    return query;
};

const search: RequestHandler = handleErrorMiddleware(async (req, res) => {
    const { title, author } = req.query;

    const query = buildPostSearchQuery(title, author);
    const posts = await PostModel.find(query);
    res.send({ posts });
});



export {
    create,
    get,
    search
};
