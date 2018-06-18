const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlService = require('../services/urlService');

router.post('/urls', jsonParser, (req, res, next) => {
    const longUrl = req.body.longUrl;
    res.json({
        longUrl: longUrl,
        shortUrl: urlService.getShortUrl(longUrl)
    });
});

module.exports = router;
