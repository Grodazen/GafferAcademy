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

  create: function (req, res, next) {

    CoachUser.create( req.params.all(), function userCreated(err, coach){

      if (req.param("password") != req.param("confirmation")){
        return next("The password dont match. Please try again.");
      }

      if(err) {
        req.flash('err', err.ValidationError);
        return res.redirect('/coach/register')
      }

      res.json(coach);
      //req.session.flash = {};
      //res.redirect('/coach/show/' + coach.id);

    });
  },

  show: function (req, res, next) {
    CoachUser.findone(req.param('id'), function foundCoach(err, coach){
      if (err) return next(err);
      if (!coach) return next();

      res.view({
        CoachUser: coach
      });
    });
  }

};

