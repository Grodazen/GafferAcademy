/**
 * Allow any authenticated coach.
 */
/*
module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.Coach && req.session.Coach.admin) {
    return ok();
  }

  // Coach is not allowed
  else {
    var requireAdminError = [{name: 'requireAdminError', message: 'You must be an admin.'}]
    req.session.flash = {
      err: requireAdminError
    }
    res.redirect('/session/new');
    return;
  }
};
*/
