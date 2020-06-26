const jwt = require('jsonwebtoken');
const { onUnathorized } = require('../handlers/index');

module.exports = async (ctx, next) => {
    try {
        const isPublicRoute = /\/login$|\/signup$/.test(ctx.request.url);

        if (isPublicRoute) {
            return next();
        }

        const { authorization } = ctx.request.header;

        const token = authorization.replace('Bearer ', '');

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        ctx.userId = decoded.id;

        return next();
    } catch (err) {
        return onUnathorized(ctx, err.message);
    }
}