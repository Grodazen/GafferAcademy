/**
 * PlayerController
 *
 * @description :: Server-side logic for managing Players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    'new': function(req, res){
        res.view();
    },

    create: function(req, res, next) {

        var playerObj = {
            firstname: req.param('firstname'),
            lastname: req.param('lastname'),
            birthday: req.param('birthday'),
            position: req.param('position'),
            email: req.param('email'),

        }
        // Create a User with the params sent from
        // the sign-up form --> new.ejs
        Player.create(playerObj, function playerCreated(err, player) {

            if (err) {
                req.session.flash = {
                    err: err
                };
                return res.redirect('/player/new');
            }

            //return res.json(user);
            res.redirect('/player/show/'+ player.id);
        });
    },

    show: function(req, res, next) {
        Player.findOne(req.param('id'), function foundPlayer(err, player) {
            if (err) return next(err);
            if (!player) return next();

            res.view({
                player: player
            });
        });
    },

    index: function(req, res, next) {
        Player.find(function foundPlayer(err, players) {
            if (err) return next(err);

            res.view({
                players: players
            });
        });
    },

    // render the edit view (e.g. /views/edit.ejs)
    edit: function (req, res, next) {

        // Find the user from the id passed in via params
        Player.findOne(req.param('id'), function foundPlayer (err, player) {
            if (err) return next(err);
            if (!player) return next('User doesn\'t exist.');

            res.view({
                player: player
            });
        });
    },

    // process the info from edit view
    update: function (req, res) {
        Player.update(req.param('id'), req.params.all(), function playerUpdated (err) {
            if (err) {
                return res.redirect('/player/edit/' + req.param('id'));
            }

            res.redirect('/player/show/' + req.param('id'));
        });
    },

    destroy: function (req, res) {

        Player.findOne(req.param('id'), function foundPlayer (err, player) {
            if (err) return res.serverError(err);

            if (!player) res.serverError(err); //('User doesn\'t exist.');

            Player.destroy(req.param('id'), function playerDestroyed(err) {
                if (err) return res.serverError(err);
            });

            res.redirect('/player');

        });
    }

};

