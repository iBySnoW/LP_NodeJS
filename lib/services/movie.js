"use strict";

const { Service } = require("@hapipal/schmervice");

const Boom = require("@hapi/boom");
const Jwt = require("@hapi/jwt");

module.exports = class MovieService extends Service {
  async create(movie, mailerService) {
    const { User, Movie } = this.server.models();

    let result = await Movie.query().insertAndFetch(movie);
    let emailList = [];

    if (result) {
      let objectList = await User.query().select("mail");
      objectList.forEach((email) => {
        emailList.push(email.mail);
      });

      mailerService.movieAdd(emailList, movie);
    }

    return result;
  }
  find() {
    const { Movie } = this.server.models();

    return Movie.query().throwIfNotFound();
  }
  delete(id) {
    const { Movie } = this.server.models();

    return Movie.query().deleteById(id).throwIfNotFound();
  }
  async patch(movie, id, mailerService) {
    const { Movie, UserFavoriteMovie } = this.server.models();

    let emailList = []
    let result = await Movie.query()
      .patch(movie)
      .findById(id)
      .throwIfNotFound();

    if (result) {
      let objectList = await UserFavoriteMovie.query().select("mail").innerJoin('user', 'userfavoritemovie.user_id', 'user.id').where('movie_id', id);
      objectList.forEach((email) => {
        emailList.push(email.mail);
      });

      let movieInfo = await Movie.query().findById(id).throwIfNotFound()

      mailerService.movieUpdate(emailList, movieInfo);
    }

    return result;
  }
};
