const mongooseDelete = require('mongoose-delete');
const mongoose = require('mongoose');
const db = require('../_shared/database/database.connector');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { versionKey: false, timestamps: true });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.User = db.connection.model('User', schema);