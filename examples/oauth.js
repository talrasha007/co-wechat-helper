var co = require('co'),
    api = new (require('../').Api)('YOUR APPID', 'YOU APP SECRET');

co(function *() {
    console.log(yield api.oauth.getToken('code'));
    console.log(yield api.oauth.refreshToken('refresh_token'));
    console.log(yield api.oauth.getInfo('openid', 'access token'));
    console.log(yield api.oauth.auth('openid', 'access token'));
}).catch(function (err) {
    console.log(err.stack || err);
});