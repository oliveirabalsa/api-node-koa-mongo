const { onSuccess, onCreated, onDeleted, onError, onUnathorized, onNotFound } = require('../_shared/handlers/index');

const commentService = require('../services/comment.service');

class Controller {
    async create(ctx) {
        try {
            const { body } = ctx.request;

            const created = await commentService.create(body);

            onCreated(ctx, created);
        } catch (err) {
            onError(ctx, err.message);
        }
    }

    async update(ctx) {
        try {
            const { id } = ctx.params;
            const { body } = ctx.request;

            const created = await commentService.update(id, body);

            if (post.author !== ctx.postId) {
                return onUnathorized(ctx, 'Only the comment original author can update!');
            }

            onSuccess(ctx, created);
        } catch (err) {
            onError(ctx, err.message);
        }
    }

    async list(ctx) {
        try {
            const { query } = ctx.request;

            const comments = await commentService.list(query);

            onSuccess(ctx, comments);
        } catch (err) {
            onError(ctx, err.message);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;

            const comment = await commentService.getById(id);

            if (!comment) {
                return onNotFound(ctx, 'The comment you are looking for does not exists or was removed by author!');
            }

            onSuccess(ctx, comment);
        } catch (err) {
            onError(ctx, err.message);
        }
    }

    async remove(ctx) {
        try {
            const { id } = ctx.params;

            if (post.author !== ctx.postId) {
                return onUnathorized(ctx, 'Only the comment original author can delete!');
            }

            await commentService.remove(id);

            onDeleted(ctx);
        } catch (err) {
            onError(ctx, err.message);
        }
    }
}

module.exports = new Controller();