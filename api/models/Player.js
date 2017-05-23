/**
 * Player.js
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

      birthday: {
        type: 'string',
        date: true,
        required: false
      },

      position: {
        type: 'string'
      },

      email: {
        type: 'string',
        email: true,
        required: false,
        unique: true
      }

  }
};

