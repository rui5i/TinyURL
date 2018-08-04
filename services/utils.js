// middle ware to chech whether user is logged in
const isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = {
    isLoggedIn: isLoggedIn
};
