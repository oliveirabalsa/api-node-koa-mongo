const dateFilter = require('../_shared/query/query-date.helper');
const paginator = require('../_shared/query/query-pagination.helper');
const mongoose = require('mongoose')
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');

class Controller {
    async create(payload) {
        return Post.create(payload);
    }

    async update(id, payload) {
        return Post.updateOne(mongoose.mongo.ObjectId(id), payload);
    }

    async list(query) {
        const filters = { ...dateFilter(query) };

        if (query.title && query.title.length >= 4) {
            filters.title = {
                $regex: new RegExp(`.*${query.title}.*`, 'gi')
            }
        }

        if (query.tags) {
            filters.tags = {
                $in: query.tags.split(',')
            }
        }

        const { skip, limit } = paginator(query);

        return Post.find(query)
            .skip(skip)
            .limit(limit);
    }

    async listComments(postId, query) {
        const { skip, limit } = paginator(query);

        return Comment.find({ post: postId })
            .skip(skip)
            .limit(limit);
    }

    async getById(id) {
        return Post.findOne({ _id: mongoose.Types.ObjectId(id) });
    }

    async remove(id) {
        return Post.delete({ _id: mongoose.mongo.ObjectId(id) });
    }
}

module.exports = new Controller();