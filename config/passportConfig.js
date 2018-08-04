const passport = require('passport');
const localStrategy = require('passport-local');
const UsersModel = require('../dao/models').UsersModel;

// config to let passport serialize/deserialize user instance to/from session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await UsersModel.findOne({ _id: id });
        done(null, user);
    } catch(err) {
        done(err);
    }
});

/** Registration config **/
passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // set true to pass req to next cb
}, async (req, email, password, done) => {
    try {
        const user = await UsersModel.findOne({ email: email.trim() });
        // if email already exitsts
        if (user) {
            return done(null, false, { message: "Email already exitsts!" });
        }
        // register new user
        let newUser = new UsersModel({
            email: email.trim(),
            username: req.body.username.trim()
        });
        newUser.password = newUser.encryptPassword(password);
        const saveResponse = await newUser.save();
        console.log("[INFO] New user registered:\n" + saveResponse);

        return done(null, newUser);
    } catch (err) {
        return done(err);
    }
}));

/** Login config **/
passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await UsersModel.findOne({ email: email.trim() });
        // if user doesn't exists
        if (!user) {
            return done(null, false, { message: "Email doesn\'t exist!" });
        }
        // if password is wrong
        if (!user.validPassword(password)) {
            return done(null, false, { message: "Password is wrong!" });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));
