const express = require('express');

const app = express();

app.get('/', (req, res, next) => res.send('Hello World!'));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    const hostname = 'http://localhost';
    console.log("Express server listening on %s:%s", hostname, app.get('port'));
})
