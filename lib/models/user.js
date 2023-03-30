'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            userName: Joi.string().min(3).example('iBySnoW').description('Username of the user'),
            password: Joi.string(),
            mail: Joi.string().pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            scope: Joi.string().valid('Admin', 'User')
        });
    }
    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.scope = 'User'
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }
};
