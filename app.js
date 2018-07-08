const express = require('express');
const indexRouter = require('./routes/index');
const restRouter = require('./routes/rest');
const redirectRouter = require('./routes/redirect');
const mongoose = require('mongoose');
const dbCredentials = require('./dbCredentials.json');

// connect to mongoDB instance globally one time here
const dbConnectionUrl = "mongodb://" + dbCredentials.username + ":" + dbCredentials.password + "@ds219181.mlab.com:19181/tinyurl";
mongoose.connect(dbConnectionUrl);

const app = express();

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
