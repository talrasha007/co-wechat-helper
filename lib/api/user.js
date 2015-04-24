
var UserApi = module.exports = function (request) {
    this._request = request;
};

UserApi.prototype = {
    getInfo: function *(openid, lang) {
        lang = lang || 'zh_CN';
        return yield* this._request.get('https://api.weixin.qq.com/cgi-bin/user/info', { openid: openid, lang: lang }, this._request.TOKEN);
    }
};
