const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** UrlMappings Model **/
const UrlMappingsSchema = new Schema({
    longUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const UrlMappingsModel = mongoose.model('UrlMapping', UrlMappingsSchema);

/** RequestInfos Model **/
const RequestInfosSchema = new Schema({
    shortUrl: {
        type: String,
        required: true
    },
    referer: String,
    platform: String,
    browser: String,
    country: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const RequestInfosModel = mongoose.model('RequestInfo', RequestInfosSchema);

module.exports = {
    UrlMappingsModel : UrlMappingsModel,
    RequestInfosModel : RequestInfosModel
}
