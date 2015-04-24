var Request = require('./request.js'),
    OauthApi = require('./oauth.js'),
    UserApi = require('./user.js');

var Api = module.exports = function (appid, secret) {
    var request = new Request(appid, secret);

    this._request = request;
    this.oauth = new OauthApi(request);
    this.user = new UserApi(request);
};

Api.prototype = {
    getAccessToken: function *(force) {
        return yield* this._request.getAccessToken(force);
    },

    listIp: function *() {
        return yield* this._request.get('https://api.weixin.qq.com/cgi-bin/getcallbackip', { }, this._request.TOKEN);
    }
};