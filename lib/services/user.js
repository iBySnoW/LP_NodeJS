"use strict";

const { Service } = require("@hapipal/schmervice");

const Crypto = require("@ibysnow/iut_encrypt");
const Boom = require("@hapi/boom");
const Jwt = require("@hapi/jwt");

module.exports = class UserService extends Service {
  async create(user, mailerService) {
    const { User } = this.server.models();

    user.password = Crypto.sha1(user.password);

    let result = await User.query().insertAndFetch(user);

    if(result){
      await mailerService.userCreated(user.mail);
    }

    return result
  }
  async addFavoriteMovie(user_id, movie_id) {
    const { UserFavoriteMovie } = this.server.models();

    let exist =  await UserFavoriteMovie.query()
    .findOne({
      user_id : user_id,
      movie_id : movie_id
    })

    if(exist){
      throw Boom.badRequest('You have already this film on your favorite list !')
    }

    return await UserFavoriteMovie.query()
    .insert({
      user_id : user_id,
      movie_id : movie_id
    })
    
  }

  async removeFavoriteMovie(user_id, movie_id) {
    const { UserFavoriteMovie } = this.server.models();

    try {
      let result = await UserFavoriteMovie.query()
      .delete()
      .where('user_id', user_id)
      .where('movie_id', movie_id)

      if(result){
        throw Boom.badRequest('This movie is not in your favorite !')
      }

      return 'The movie has been successfully removed from your favorites list !'

    } catch (error) {
      return error
    }
  }

  find() {
    const { User } = this.server.models();

    return User.query().throwIfNotFound();
  }
  delete(id) {
    const { User } = this.server.models();

    return User.query().deleteById(id).throwIfNotFound();
  }
  patch(user, id) {
    const { User } = this.server.models();

    if (user.password) {
      user.password = Crypto.sha1(user.password);
    }

    return User.query().patch(user).findById(id).throwIfNotFound();
  }

  giveAdminScope(){
    const { User } = this.server.models();

    return User.query().patch({ scope: 'Admin' }).findById(id).throwIfNotFound();
  }

  async login(userLogin) {
    const { User } = this.server.models();

    const user = await User.query().findOne({
      mail: userLogin.mail,
      password: Crypto.sha1(userLogin.password),
    });

    if (!user) {
      throw Boom.badRequest("Bad credentials");
    }

    const token = Jwt.token.generate(
      {
        aud: "urn:audience:iut",
        iss: "urn:issuer:iut",
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.mail,
        scope: user.scope,
      },
      {
        key: "YJaur87GweUQCyx9", // La clé qui est définit dans lib/auth/strategies/jwt.js
        algorithm: "HS512",
      },
      {
        ttlSec: 14400, // 4 hours
      }
    );
      
    return { token: `Bearer ${token}` };
  }
};
