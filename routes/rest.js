const express = require('express');
const router = express.Router();
const urlService = require('../services/urlService');
const eventHandlerWrapper = require('./eventHandlerWrapper');

/**
 * New url mapping event handler When user posts longUrl
 */
router.post('/urls', eventHandlerWrapper(async (req, res, next) => {
    const longUrl = req.body.longUrl;
    const urlMapping = await urlService.getShortUrl(longUrl);
    res.json(urlMapping);
}));

/**
 * API "/api/v1/urls/:shortUrl" is to show the information
 * of shortUrl and longUrl right after user's request to
 * generate new url mapping.
 */
router.get('/urls/:shortUrl', eventHandlerWrapper(async (req, res, next) => {
    const shortUrl = req.params.shortUrl;
    const urlMapping = await urlService.getLongUrl(shortUrl);
    res.json(urlMapping);
}));

module.exports = router;
