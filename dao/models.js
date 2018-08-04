const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

/** Users Model **/
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    shorUrls: []
});

// for user registration
UserSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
}

// for user login
UserSchema.methods.validPassword = function(passwordToCheck) {
    return bcrypt.compareSync(passwordToCheck, this.password);
}

const UsersModel = mongoose.model('User', UserSchema);

module.exports = {
    UrlMappingsModel : UrlMappingsModel,
    RequestInfosModel : RequestInfosModel,
    UsersModel : UsersModel
};
