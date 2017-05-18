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

    var coachObj = {
      name: req.param('firstname' + '&nbsp;' + 'lastname'),
      //firstname: req.param('firstname'),
      //lastname: req.param('lastname'),
      email: req.param('email'),
      tlf: req.param('tlf'),
      password: req.param('password'),
      confirmation: req.param('confirmation')
    }

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    Coach.create(coachObj, function coachCreated(err, coach) {

        // // If there's an error
        // if (err) return next(err);

        if (err) {
          console.log(err);
          req.session.flash = {
            err: err
          }

          // If error redirect back to sign-up page
          return res.redirect('/coach/new');
        }
  // Log user in
      req.session.authenticated = true;
      req.session.Coach = coach;

      // Change status to online
      coach.online = true;
      coach.save(function(err, coach) {
        if (err) return next(err);

        // add the action attribute to the user object for the flash message.
        coach.action = " signed-up and logged-in."

        // Let other subscribed sockets know that the user was created.
        Coach.publishCreate(coach);

        // After successfully creating the user
        // redirect to the show action

        res.redirect('/coach/show/' + coach.id);
      });
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
  },

  // This action works with app.js socket.get('/user/subscribe') to
  // subscribe to the User model classroom and instances of the user
  // model
  subscribe: function(req, res) {

    // Find all current users in the user model
    Coach.find(function foundCoaches(err, coaches) {
      if (err) return next(err);

      // subscribe this socket to the User model classroom
      Coach.subscribe(req.socket);

      // subscribe this socket to the user instance rooms
      Coach.subscribe(req.socket, coaches);

      // This will avoid a warning from the socket for trying to render
      // html over the socket.
      res.send(200);
    });
  }

};

