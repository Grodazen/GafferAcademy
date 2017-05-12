/**
 * CoachUserController
 *
 * @description :: Server-side logic for managing coachusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'register': function(req, res){
    res.view();
  },

  create: function(req, res, next) {
      // Create a User with the params sent from
      // the sign-up form --> new.ejs
    CoachUser.create(req.allParams(), function userCreated(err, user){

      if (req.param("password") != req.param("confirmation")){
        return next("The password don't match. Please try again.");
      }

      if(err) {
        req.session.flash = {
          err: err
        };
        return res.redirect('/coach/register')
      }

      //res.json(coach);
      res.redirect('/coach/show/' + user.id);
    });
  },

  show: function(req, res) {
    CoachUser.findone(req.param('id'), function foundUser(err, user){
      if (err || !user) return res.serverError(err);

      res.view({
        user: user
      });
    });
  },

  index: function (req, res) {
    CoachUser.find(function foundUser(err, users) {
      if (err) return res.serverError(err);
      res.view({users: users})

    });
  },

  // render the edit view (e.g. /views/edit.ejs)
  edit: function(req, res) {
    // Find the user from the id passed in via params
    CoachUser.findOne(req.param('id'), function foundUser (err, user) {
      if (err) return res.serverError(err);
      if (!user) return res.serverError(err);

      res.view({
        user: user
      });
    });
  },

  update: function(req, res) {
    CoachUser

  }

};

