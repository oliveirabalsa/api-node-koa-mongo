const { onSuccess, onCreated, onDeleted, onError, onUnathorized, onNotFound } = require('../_shared/handlers/index');

const postService = require('../services/post.service');

class Controller {
    async create(ctx) {
        try {
            const { body } = ctx.request;

            const created = await postService.create(body);

            onCreated(ctx, created);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }

    async update(ctx) {
        try {
            const { id } = ctx.params;
            const { body } = ctx.request;

            const post = await postService.getById(id);

            if(post.author !== ctx.userId) {
                return onUnathorized(ctx, 'Only the post original author can update the post!');
            }

            const created = await postService.update(id, body);

            onSuccess(ctx, created);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }

    async list(ctx) {
        try {
            const { query } = ctx.request;

            const posts = await postService.list(query, pagination);

            onSuccess(ctx, posts);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }

    async listComments(ctx) {
        try {
            const { query } = ctx.request;
            const { id } = ctx.params;

            const comments = await postService.listComments(id, query);

            onSuccess(ctx, comments);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;

            const post = await postService.getById(id);

            if(!post) {
                return onNotFound(ctx, 'The post you are looking for does not exists or was removed by author!');
            }

            onSuccess(ctx, post);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }

    async remove(ctx) {
        try {
            const { id } = ctx.params;

            const post = await postService.getById(id);

            if(post.author != ctx.userId) {
                return onUnathorized(ctx, 'Only the post original author can remove!');
            }

            await postService.remove(id);

            onDeleted(ctx);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }
}

module.exports = new Controller();