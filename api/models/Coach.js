/**
 * Coach.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');

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

    encryptedPassword: {
      type: 'string',
      minLength: 8
    },

    /*lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    gravatarUrl: {
      type: 'string'
    },


    online: {
      type: 'boolean',
      defaultsTo: false
    },


    admin: {
      type: 'boolean',
      defaultsTo: false
    },*/

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }

  },

/*
  beforeValidation: function (values, next) {
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      } else  if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
    next();
  },
*/
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

