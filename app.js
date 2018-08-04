const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const indexRouter = require('./routes/index');
const restRouter = require('./routes/rest');
const redirectRouter = require('./routes/redirect');
const mongoose = require('mongoose');
const dbCredentials = require('./dbCredentials.json');

// connect to mongoDB instance globally one time here
const dbConnectionUrl = "mongodb://" + dbCredentials.username + ":" + dbCredentials.password + "@ds219181.mlab.com:19181/tinyurl";
mongoose.connect(dbConnectionUrl, { useNewUrlParser: true });

// import Passport config
require('./config/passportConfig.js');

const app = express();

/**
 * Normal middleware definition
 */
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(session({
    secret: 'random string for session id',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 120 * 60 * 1000 }
 }));
 app.use(passport.initialize());
 app.use(passport.session());

/**
 * Router definition
 */
app.use('/', indexRouter);
app.use('/api/v1', restRouter);
app.use('/:shortUrl', redirectRouter);

/**
 * Server launching config
 */
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    const hostname = 'http://localhost';
    console.log("Express server listening on %s:%s", hostname, app.get('port'));
})
