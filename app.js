const express = require('express');
const indexRouter = require('./routes/index');
const restRouter = require('./routes/rest');
const redirectRouter = require('./routes/redirect');


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
