const models = require('../dao/models');
const UrlMappingsModel = models.UrlMappingsModel;

/**
 * Generate new shortUrl or look up existing shortUrl based on
 * longUrl provided by user.
 *
 * Return - urlMapping
 */
const getShortUrl = async function(longUrl) {
    longUrl = formatLongUrl(longUrl);

    try {
        const urlMappingResponse = await UrlMappingsModel.findOne({ longUrl: longUrl });
        
        if (urlMappingResponse) {
            return buildUrlMappingFromDBResponse(urlMappingResponse);
        } else {
            const urlMappingCount = await UrlMappingsModel.count({});
            const shortUrl = base10ToBase62(urlMappingCount);

            // persist new record to DB
            const newUrlMappingRecord = new UrlMappingsModel({
                longUrl: longUrl,
                shortUrl: shortUrl,
                createdDate: Date.now()
            })

            const persistResponse = await newUrlMappingRecord.save();
            console.log("[INFO] New URL mapping saved to MongoDB: \n" + persistResponse);
            return buildUrlMappingFromDBResponse(persistResponse);
        }
    } catch(err) {
        throw err;
    }
}

/**
 * Look up existing longUrl which shortUrl provided by user
 * maps to from DB.
 *
 * Return - urlMapping or null if no mapping found in DB
 */
const getLongUrl = async function(shortUrl) {
    try {
        const urlMappingResponse = await UrlMappingsModel.findOne({ shortUrl: shortUrl });
        return urlMappingResponse? buildUrlMappingFromDBResponse(urlMappingResponse) : urlMappingResponse;
    } catch(err) {
        throw err;
    }
}

const formatLongUrl = function(longUrl) {
    longUrl = longUrl.trim();
    if (longUrl.indexOf('http') === -1) {
        longUrl = 'http://' + longUrl;
    }
    return longUrl;
}

const buildUrlMappingFromDBResponse = function(dbResponse) {
    return {
        longUrl: dbResponse.longUrl,
        shortUrl: dbResponse.shortUrl,
        createdDate: dbResponse.createdDate
    };
}

const base10ToBase62 = function(num) {
    const symbolArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let shortUrl = '';
    let r = 0;
    num++;

    while (num != 0) {
        r = --num % 62;
        num = Math.floor(num / 62);
        shortUrl = symbolArray[r] + shortUrl;
    }

    return shortUrl;
}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};
