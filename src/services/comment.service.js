const mongoose = require('mongoose')
const { Comment } = require('../models/comment.model');

class Controller {
    async create(payload) {
        return Comment.create(payload);
    }

    async update(id, payload) {
        return Comment.updateOne(mongoose.mongo.ObjectId(id), payload);
    }

    async list(condition) {
        return  Comment.find(condition);
    }

    async getById(id) {        
        return Comment.findOne({ _id: mongoose.Types.ObjectId(id) });
    }

    async remove(id) {
        return Comment.delete({ _id: mongoose.mongo.ObjectId(id) });
    }
}

module.exports = new Controller();