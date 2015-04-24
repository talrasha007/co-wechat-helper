
var UserApi = module.exports = function (request) {
    this._request = request;
};

UserApi.prototype = {
    list: function *(next) {
        return yield* this._request.get('https://api.weixin.qq.com/cgi-bin/user/get', next && { next_openid: next }, this._request.TOKEN);
    },

    getInfo: function *(openid, lang) {
        lang = lang || 'zh_CN';
        return yield* this._request.get('https://api.weixin.qq.com/cgi-bin/user/info', { openid: openid, lang: lang }, this._request.TOKEN);
    }
};
