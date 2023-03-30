"use strict";

const Joi = require("joi");
const { Model } = require("@hapipal/schwifty");

module.exports = class UserFavoriteMovie extends Model {
  static get tableName() {
    return "userFavoriteMovie";
  }

  static get joiSchema() {
    return Joi.object({
      user_id: Joi.number().integer().greater(0),
      movie_id: Joi.number().integer().greater(0),
    });
  }
};
