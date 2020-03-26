import PostModel, { IPost } from '../models/post.model';

async function createPost(body: any): Promise<IPost> {
    const {
        title, detail, pictureUrl, author, authorProfilePic, publishDate,
    } = body;

    const post = new PostModel({ title, detail, pictureUrl, author, authorProfilePic, publishDate });
    await post.save();
    return post;
}

async function updatePost(id: string, body: any) {
    const {
        title, detail, pictureUrl,
    } = body;
    await PostModel.updateOne({ _id: id }, {
        title, detail, pictureUrl,
    }).exec();
}

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

async function getPosts(query: any) {
    const { title, author } = query;

    const searchQuery = buildPostSearchQuery(title, author);
    return PostModel.find(searchQuery);
}

async function deletePostById(id: string) {
    await PostModel.deleteOne({ _id: id }).exec();
}

export {
    createPost,
    updatePost,
    getPosts,
    deletePostById,
};
