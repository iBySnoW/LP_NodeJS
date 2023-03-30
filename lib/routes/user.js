"use strict";

const Joi = require("joi");

module.exports = [
  {
    method: "post",
    path: "/user",
    options: {
      auth: false,
      tags: ["api"],
      validate: {
        payload: Joi.object({
          firstName: Joi.string()
            .required()
            .min(3)
            .example("John")
            .description("Firstname of the user"),
          lastName: Joi.string()
            .required()
            .min(3)
            .example("Doe")
            .description("Lastname of the user"),
          userName: Joi.string()
            .min(3)
            .example("iBySnoW")
            .description("Username of the user"),
          mail: Joi.string()
            .example("yourMail@exemple.com")
            .description("Email of the user"),
          password: Joi.string()
            .example("Password93!")
            .description("Password of the user"),
        }),
      },
    },
    handler: async (request, h) => {
      const { userService, mailerService } = request.services();

      return await userService.create(request.payload, mailerService);
    },
  },
  {
    method: "post",
    path: "/user/{user_id}/addFavoriteMovie/{movie_id}",
    options: {
      auth: {
        scope: ["User", "Admin"],
      },
      tags: ["api"],
    },
    handler: async (request, h) => {
      const { userService } = request.services();

      return await userService.addFavoriteMovie(request.params.user_id, request.params.movie_id);;
    },
  },
  {
    method: "delete",
    path: "/user/{user_id}/removeFavoriteMovie/{movie_id}",
    options: {
      auth: {
        scope: ["User", "Admin"],
      },
      tags: ["api"],
    },
    handler: async (request, h) => {
      const { userService } = request.services();

      return await userService.removeFavoriteMovie(request.params.user_id, request.params.movie_id);
    },
  },
  {
    method: "get",
    path: "/users",
    options: {
      auth: {
        scope: ["Admin"],
      },
      tags: ["api"],
    },
    handler: async (request, h) => {
      const { userService } = request.services();

      return await userService.find();
    },
  },
  {
    method: "delete",
    path: "/user/{id}",
    options: {
      auth: {
        scope: ["Admin"],
      },
      tags: ["api"],
    },
    handler: async (request, h) => {
      const { userService } = request.services();
      return await userService.delete(request.params.id);
    },
  },
  {
    method: "patch",
    path: "/user/{id}",
    options: {
      auth: {
        scope: ["Admin"],
      },
      tags: ["api"],
      validate: {
        payload: Joi.object({
          firstName: Joi.string()
            .min(3)
            .example("John")
            .description("Firstname of the user"),
          lastName: Joi.string()
            .min(3)
            .example("Doe")
            .description("Lastname of the user"),
          userName: Joi.string()
            .example("iBySnoW")
            .description("Username of the user"),
          mail: Joi.string().example("yourMail@exemple.com"),
          password: Joi.string().example("Password93!"),
        }),
      },
    },
    handler: async (request, h) => {
      const { userService } = request.services();
      return await userService.patch(request.payload, request.params.id);
    },
  },
  {
    method: "patch",
    path: "/user/toAdmin/{id}",
    options: {
      auth: {
        scope: ["Admin"],
      },
      tags: ["api"],
    },
    handler: async (request, h) => {
      const { userService } = request.services();
      return await userService.giveAdminScope(request.params.id);
    },
  },
  {
    method: "post",
    path: "/user/login",
    options: {
      auth: false,
      tags: ["api"],
      validate: {
        payload: Joi.object({
          mail: Joi.string().example("yourMail@exemple.com"),
          password: Joi.string().example("Password93!"),
        }),
      },
    },
    handler: async (request, h) => {
      const { userService } = request.services();

      /*await mailerService.userCreated(request.payload.mail);*/
      return await userService.login(request.payload);
    },
  },
];
