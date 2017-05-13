/**
 * CoachUserController
 *
 * @description :: Server-side logic for managing coachusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  'new': function(req, res){
    res.view();
  },

  create: function(req, res, next) {
      // Create a User with the params sent from
      // the sign-up form --> new.ejs
    CoachUser.create(req.allParams(), function coachCreated(err, coach){

      if (req.param("password") != req.param("confirmation")){
        return next("The password don't match. Please try again.");
      }

      if(err) {
        req.session.flash = {
          err: err
        };
        return res.redirect('/coach/new')
      }

      //res.json(coach);
      res.redirect('/coach/show/' + coach.id);
    });
  },

  show: function(req, res) {
    CoachUser.findone(req.param('id'), function foundCoach(err, coach){
      if (err || !coach) return res.serverError(err);

      res.view({
        coach: coach
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

  // process the info from edit view
  update: function (req, res) {
    CoachUser.update(req.param('id'), req.params.all(), function userUpdated (err) {
      if (err) {
        return res.redirect('/coach/edit/' + req.param('id'));
      }

      res.redirect('/coach/show/' + req.param('id'));
    });
  },

  destroy: function (req, res) {

    CoachUser.findOne(req.param('id'), function foundUser (err, user) {
      if (err) return res.serverError(err);

      if (!user) res.serverError(err); //('User doesn\'t exist.');

      CoachUser.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return res.serverError(err);
      });

      res.redirect('/coach');

    });
  }
};

