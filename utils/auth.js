const withAuth = (req, res, next) => {
    // Redirects to the login page if user isn't logged in
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
