var Request = require('./request.js'),
    UserApi = require('./user.js');

var Api = module.exports = function (appid, secret) {
    var request = new Request(appid, secret);

    this._request = request;
    this.user = new UserApi(request);
};

Api.prototype = {
    getAccessToken: function *() {
        return yield* this._request.getAccessToken();
    },

    listIp: function *() {
        return yield* this._request.get('https://api.weixin.qq.com/cgi-bin/getcallbackip', { }, this._request.TOKEN);
    }
};