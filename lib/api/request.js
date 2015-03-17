var _ = require('codash'),
    request = require('co-request');

var Request = module.exports = function (appid, secret) {
    this._appid = appid;
    this._secret = secret;
};

Request.prototype = {
    APPID_ONLY: 1,
    NO_APPID: 2,
    TOKEN: 3,

    getAccessToken: function *(force) {
        if (!force && this._token && this._token.expire > new Date()) {
            return this._token.access_token;
        } else {
            var token = yield* this.get('https://api.weixin.qq.com/cgi-bin/token', { grant_type: 'client_credential' });
            if (!token.access_token) throw new Error('Get AccessToken Error:' + token.errmsg);

            token.expire = new Date(Date.now() + (token.expires_in - 60) * 1000);
            this._token = token;
            return token.access_token;
        }
    },

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
            case this.TOKEN:
                qs = { access_token: yield* this.getAccessToken() };
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
            case this.TOKEN:
                qs = { access_token: yield* this.getAccessToken() };
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
