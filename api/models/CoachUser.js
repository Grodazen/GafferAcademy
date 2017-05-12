var values;
/**
 * CoachUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string',
      required: true
    },

    emailAddress: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    tlfNr: {
      type: 'integer',
      required: true,
      unique: true
    },

    encryptedPassword: {
      type: 'string',
      required: true
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      delete obj;
    }
  },

    beforeCreate: function (values, next){
      // This checks to make sure the password and password confirmation match before creating record
      if (!values.password || vlaues.password != values.confirmation){
        return next({err: ["Password doesn't match confirmation"]});
      }

      require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
        if (err) return next(err);
        values.encryptedPassword = encryptedPassword;
        next();
      });

  }
};

