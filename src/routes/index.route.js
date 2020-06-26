const authMiddleware = require('../_shared/middlewares/auth');
const userRoutes = require('./users.route');
const postsRoutes = require('./posts.route');
const commentsRoutes = require('./comments.route');
const Router = require('koa-router');


class RouterController {
    constructor() {
        this.router = new Router();
    }
    
    load(app) {
        this.router.prefix(`/api/${process.env.BASE_API}`);
        this.router.use(authMiddleware);
        
        userRoutes(this.router);
        postsRoutes(this.router);
        commentsRoutes(this.router);
        
        app.use(this.router.routes());
    }
}

module.exports = new RouterController();