const { onSuccess, onCreated, onDeleted, onError, onUnathorized } = require('../_shared/handlers/index');

const userService = require('../services/user.service');
const postService = require('../services/post.service');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Controller {
    async login(ctx) {
        try {
            const { authorization } = ctx.headers;

            const userAuth = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString('utf-8');

            const [email, password] = userAuth.split(':');

            const user = await userService.getLoginData({ email });

            if (!user) {
                return onError(ctx, 'Email not found!');
            }

            const authenticated = bcrypt.compareSync(password, user.password);

            if (!authenticated) {
                return onUnathorized(ctx, 'Inavlid password!');
            }

            const token = jwt.sign({
                id: user._id,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: 86400 });

            onSuccess(ctx, {
                type: 'Bearer',
                token,
                expiresIn: 86400
            });
        } catch (err) {
            onError(ctx, err);
        }
    }

    async signup(ctx) {
        try {
            const { body } = ctx.request;

            const created = await userService.create(body);

            return onCreated(ctx, created);
        } catch (err) {
            console.log(err);
            onError(ctx, err);
        }
    }

    async update(ctx) {
        try {
            const { id } = ctx.params;
            const { body } = ctx.request;

            await userService.update(id, body);

            onSuccess(ctx, body);
        } catch (err) {
            onError(ctx, err);
        }
    }

    // async list(ctx) {
    //     try {
    //         const { query } = ctx.request;

    //         const users = await userService.list(query);

    //         onSuccess(ctx, users);
    //     } catch (err) {
    //         onError(ctx, err);
    //     }
    // }

    async getById(ctx) {
        try {
            const { id } = ctx.params;

            if (id !== ctx.userId) {
                return onUnathorized(ctx, 'You can only delete your own account');
            }

            const user = await userService.getById(id);

            if (!user) {

            }

            onSuccess(ctx, user);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async remove(ctx) {
        try {
            const { id } = ctx.params;

            await userService.remove(id);

            onDeleted(ctx);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async listPosts(ctx) {
        try {
            const { id } = ctx.params;
            const query = ctx.request;

            const pagination = {
                skip: Number(query.skip) || 0,
                limit: Number(query.limit) || 20
            }

            const posts = await postService.list({ author: id }, pagination);

            onSuccess(ctx, posts);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async listComments(ctx) {

    }
}

module.exports = new Controller();