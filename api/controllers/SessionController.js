/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcryptjs');

module.exports = {

  'new': function(req, res) {
    res.view('session/new');
  },

  create: function(req, res, next) {

    // Check for email and password in params sent via the form, if none
    // redirect the browser back to the sign-in form.
    if (!req.param('email') || !req.param('password')) {
      // return next({err: ["Password doesn't match password confirmation."]});

      var usernamePasswordRequiredError = [{
        name: 'usernamePasswordRequired',
        message: 'You must enter both a username and password.'
      }]

      // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
      // the key of usernamePasswordRequiredError
      req.session.flash = {
        err: usernamePasswordRequiredError
      }

      res.redirect('/session/new');
      return;
    }

    // Try to find the user by there email address.
    // Coach.findOneByEmail(req.param('email')).done(function(err, user) {
    Coach.findOne(req.param('email'), function foundCoach(err, coach) {
      if (err) return next(err);

      // If no user is found...
      if (!coach) {
        var noAccountError = [{
          name: 'noAccount',
          message: 'The email address ' + req.param('email') + ' not found.'
        }]
        req.session.flash = {
          err: noAccountError
        }
        res.redirect('/session/new');
        return;
      }

      // Compare password from the form params to the encrypted password of the user found.
      bcrypt.compare(req.param('password'), coach.encryptedPassword, function(err, valid) {
        if (err) return next(err);

        // If the password from the form doesn't match the password from the database...
        if (!valid) {
          var usernamePasswordMismatchError = [{
            name: 'usernamePasswordMismatch',
            message: 'Invalid username and password combination.'
          }]
          req.session.flash = {
            err: usernamePasswordMismatchError
          }
          res.redirect('/session/new');
          return;
        }

        // Log user in
        req.session.authenticated = true;
        req.session.Coach = coach;

        // Change status to online
        coach.online = true;
        coach.save(function(err, coach) {
          if (err) return next(err);

          // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
          Coach.publishUpdate(coach.id, {
            loggedIn: true,
            id: coach.id,
            name: coach.name ,
            action: ' has logged in.'
          });

          // If the user is also an admin redirect to the user list (e.g. /views/user/index.ejs)
          // This is used in conjunction with config/policies.js file
          if (req.session.Coach.admin) {
            res.redirect('/coach');
            return;
          }

          //Redirect to their profile page (e.g. /views/user/show.ejs)
          res.redirect('/coach/show/' + coach.id);
        });
      });
    });
  },

  destroy: function(req, res, next) {

    Coach.findOne(req.session.Coach.id, function foundCoach(err, coach) {

      var coachId = req.session.Coach.id;

      if (coach) {
        // The coach is "logging out" (e.g. destroying the session) so change the online attribute to false.
        Coach.update(coachId, {
          online: false
        }, function(err) {
          if (err) return next(err);

          // Inform other sockets (e.g. connected sockets that are subscribed) that the session for this user has ended.
          Coach.publishUpdate(coachId, {
            loggedIn: false,
            id: coachId,
            name: coach.name,
            action: ' has logged out.'
          });

          // Wipe out the session (log out)
          req.session.destroy();

          // Redirect the browser to the sign-in screen
          res.redirect('/session/new');
        });
      } else {

        // Wipe out the session (log out)
        req.session.destroy();

        // Redirect the browser to the sign-in screen
        res.redirect('/session/new');
      }
    });
  }
};
