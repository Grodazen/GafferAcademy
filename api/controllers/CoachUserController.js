/**
 * CoachUserController
 *
 * @description :: Server-side logic for managing coachusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  register: function(req,res){
    res.view();
  },

  create: function (req, res, next) {

    coachUser.create( req.allParams(),
      function userCreated(err, coachUser){

      if (err) return next(err);

      res.json(coachUser);

    });

  }

};

