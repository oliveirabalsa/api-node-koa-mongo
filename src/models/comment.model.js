const mongooseDelete = require('mongoose-delete');
const mongoose = require('mongoose');
const db = require('../_shared/database/database.connector');

const schema = new mongoose.Schema({
    post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true }
}, { versionKey: false, timestamps: true });    

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.Comment = db.connection.model('Comment', schema);