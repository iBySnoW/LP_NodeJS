'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {

        return 'movie';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('Star Wars').description('Title of the movie'),
            description: Joi.string().min(15).description('Description of the movie'),
            producer: Joi.string().min(3).example('George Lucas').description('Producer of the movie'),
            releaseYear: Joi.number().required().min(1895).max(new Date().getFullYear()).example('1977').description('Release date of the film'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
        });
    }
    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};
