const mongooseDelete = require('mongoose-delete');
const mongoose = require('mongoose');
const db = require('../_shared/database/database.connector');

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, rel: 'User', required: true },
    content: { type: String, required: true },
    tags: [{ type: String, required: false }] 
}, { versionKey: false, timestamps: true });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.Post = db.connection.model('Post', schema);