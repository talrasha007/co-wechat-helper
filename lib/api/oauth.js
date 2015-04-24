
var OauthApi = module.exports = function (request) {
    this._request = request;
};

OauthApi.prototype = {
    getToken: function *(code) {
        return yield* this._request.get('https://api.weixin.qq.com/sns/oauth2/access_token', { code: code, grant_type: 'authorization_code' });
    },

    refreshToken: function *(rtoken) {
        return yield* this._request.get('https://api.weixin.qq.com/sns/oauth2/refresh_token', { grant_type: 'refresh_token', refresh_token: rtoken }, this._request.APPID_ONLY);
    },

    getInfo: function *(openid, accessToken, lang) {
        lang = lang || 'zh_CN';
        return yield* this._request.get('https://api.weixin.qq.com/sns/userinfo', { access_token: accessToken, openid: openid, lang: lang }, this._request.NO_APPID);
    },

    auth: function *(openid, accessToken) {
        return yield* this._request.get('https://api.weixin.qq.com/sns/auth', { access_token: accessToken, openid: openid }, this._request.NO_APPID);
    }
};
