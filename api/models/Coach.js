/**
 * Coach.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    firstname: {
      type: 'string',
      required: true
    },

    lastname: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    tlf: {
      type: 'integer',
      required: true,
      unique: true
    },

    password: {
      type: 'string'
    },

    toJSON: function () {
      console.log('toJSON');
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },

    beforeCreate: function (values, next) {
      // This checks to make sure the password and password confirmation match before creating record
      if (!values.password || values.password != values.confirmation) {
        return next({err: ["Password doesn't match confirmation"]});
      }

      require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
        if (err) return next(err);
        values.encryptedPassword = encryptedPassword;
        next();
      });
    }
};

