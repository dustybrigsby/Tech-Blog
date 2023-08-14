const withAuth = (req, res, next) => {
    // Redirects to the login page if user isn't logged in
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
