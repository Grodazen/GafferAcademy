/**
 * CoachController
 *
 * @description :: Server-side logic for managing Coaches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function(req, res){
    res.view();
  },

  create: function(req, res, next) {
    // Create a Coach with the params sent from
    // the sign-up form --> new.ejs
    Coach.create(req.allParams(), function coachCreated(err, coach){

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
    Coach.findOne(req.param('id'), function foundCoach(err, coach){
      if (err || !coach) return res.serverError(err);

      res.view({
        coach: coach
      });
    });
  },

  index: function (req, res) {
    Coach.find(function foundCoach(err, coaches) {
      if (err) return res.serverError(err);
      res.view({coaches: coaches})

    });
  },

  // render the edit view (e.g. /views/edit.ejs)
  edit: function(req, res) {
    // Find the user from the id passed in via params
    Coach.findOne(req.param('id'), function foundCoach (err, coach) {
      if (err) return res.serverError(err);
      if (!coach) return res.serverError(err);

      res.view({
        coach: coach
      });
    });
  },

  // process the info from edit view
  update: function (req, res) {
    Coach.update(req.param('id'), req.params.all(), function coachUpdated (err) {
      if (err) {
        return res.redirect('/coach/edit/' + req.param('id'));
      }

      res.redirect('/coach/show/' + req.param('id'));
    });
  },

  destroy: function (req, res) {

    Coach.findOne(req.param('id'), function foundCoach (err, coach) {
      if (err) return res.serverError(err);

      if (!coach) res.serverError(err); //('User doesn\'t exist.');

      Coach.destroy(req.param('id'), function coachDestroyed(err) {
        if (err) return res.serverError(err);
      });

      res.redirect('/coach');

    });
  }
};

