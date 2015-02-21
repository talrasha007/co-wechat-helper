var _ = require('codash'),
    request = require('co-request');

var Request = module.exports = function (appid, secret) {
    this._appid = appid;
    this._secret = secret;
};

Request.prototype = {
    APPID_ONLY: 1,
    NO_APPID: 2,

    get: function *(url, param, paramType, isJson) {
        isJson = isJson !== false;

        var qs;
        switch (paramType) {
            case this.APPID_ONLY:
                qs = { appid: this._appid };
                break;
            case this.NO_APPID:
                qs = {};
                break;
            default :
                qs = { appid: this._appid, secret: this._secret };
        }

        return (yield request({
            url: url,
            method: 'GET',
            json: isJson,
            qs: _.extend(qs, param)
        })).body;
    },

    post: function *(url, body, extraParam, paramType, isJson) {
        isJson = isJson !== false;

        var qs;
        switch (paramType) {
            case this.APPID_ONLY:
                qs = { appid: this._appid };
                break;
            case this.NO_APPID:
                qs = {};
                break;
            default :
                qs = { appid: this._appid, secret: this._secret };
        }

        return (yield request({
            url: url,
            method: 'POST',
            json: isJson,
            qs: _.extend(qs, extraParam),
            body: body
        })).body;
    }
};
