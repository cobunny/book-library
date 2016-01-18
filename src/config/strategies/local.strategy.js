var passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

module.exports = function () {
    passport.use(new localStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {
            var user = {
                username: username,
                password: password
            };
            done(null, user);
        }));
};
