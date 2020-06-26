const paginatorBuilder = require('../_shared/query/query-pagination.helper');
const dateFilter = require('../_shared/query/query-date.helper');
const { User } = require('../models/user.model');
const bcrypt = require('bcryptjs');

class Controller {
    async create(payload) {
        payload.password = bcrypt.hashSync(payload.password, 10);
        return User.create(payload);
    }

    async update(id, payload) {
        return User.updateOne({ _id: id }, payload);
    }

    async list(query) {
        const filters = { ...dateFilter(query) };

        if (query.name && query.name.length >= 4) {
            filters.name = new RegExp(`.*${query.name}.*`, 'i')
        }

        if (query.email) {
            filters.email = {
                $eq: query.email
            }
        }

        const { skip, limit } = paginatorBuilder(query);

        return User.find(query)
            .skip(skip)
            .limit(limit)
            .select('-password');
    }

    async findOne(query) {
        return User.findOne(query)
            .select('-password');
    }

    async getLoginData(query) {
        return User.findOne(query);
    }

    async getById(id) {
        return User.findOne({ _id: id })
            .select('-password');
    }

    async remove(id) {
        return User.delete({ _id: id });
    }
}

module.exports = new Controller();