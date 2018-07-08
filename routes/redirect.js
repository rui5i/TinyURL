const express = require('express');
const router = express.Router();
const path = require('path');
const urlService = require('../services/urlService');
const eventHandlerWrapper = require('./eventHandlerWrapper');

router.get('*', eventHandlerWrapper(async (req, res, next) => {
    //cut'/' at the beginning
    const shortUrl = req.originalUrl.slice(1);
    const urlMapping = await urlService.getLongUrl(shortUrl);
    if (urlMapping) {
        res.redirect(urlMapping.longUrl);
    } else {
        res.sendFile('404.html', { root: path.join(__dirname, '../public/views/') });
    }
}));

module.exports = router;
