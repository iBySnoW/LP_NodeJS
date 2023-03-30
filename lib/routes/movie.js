"use strict";

const Joi = require("joi");

module.exports = [
  {
    method: "post",
    path: "/movie",
    options: {
      auth: {
        scope: ["Admin"],
      },
      tags: ["api"],
      validate: {
        payload: Joi.object({
          title: Joi.string()
            .required()
            .min(3)
            .example("Star Wars")
            .description("Title of the movie"),
          description: Joi.string()
            .required()
            .min(15)
            .description("Description of the movie"),
          producer: Joi.string()
            .required()
            .min(3)
            .example("George Lucas")
            .description("Producer of the movie"),
          releaseYear: Joi.number()
            .required()
            .min(1895)
            .max(new Date().getFullYear())
            .example("1977")
            .description("Release date of the film"),
        }),
      },
    },
    handler: async (request, h) => {
      const { movieService, mailerService } = request.services();

      return await movieService.create(request.payload, mailerService);
    },
  },
  {
    method: "get",
    path: "/movies",
    options: {
      auth: {
        scope: ["Admin", "User"],
      },
      tags: ["api"],
    },
    handler: async (request, h) => {
      const { movieService } = request.services();

      return await movieService.find();
    },
  },
  {
    method: "delete",
    path: "/movie/{id}",
    options: {
      auth: {
        scope: ["Admin"],
      },
      tags: ["api"],
    },
    handler: async (request, h) => {
      const { movieService } = request.services();
      return await movieService.delete(request.params.id);
    },
  },
  {
    method: "patch",
    path: "/movie/{id}",
    options: {
      auth: {
        scope: ["Admin"],
      },
      tags: ["api"],
      validate: {
        payload: Joi.object({
          title: Joi.string()
            .min(3)
            .example("Star Wars")
            .description("Title of the movie"),
          description: Joi.string().description("Description of the movie"),
          producer: Joi.string()
            .min(3)
            .example("George Lucas")
            .description("Producer of the movie"),
          releaseYear: Joi.number()
            .min(1895)
            .max(new Date().getFullYear())
            .example("1977")
            .description("Release date of the film"),
        }),
      },
    },
    handler: async (request, h) => {
      const { movieService,  mailerService } = request.services();
      return await movieService.patch(request.payload, request.params.id, mailerService);
    },
  },
];
