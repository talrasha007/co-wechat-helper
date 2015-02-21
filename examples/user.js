var co = require('co'),
    api = new (require('../').Api)('YOUR APPID', 'YOU APP SECRET');

co(function *() {
    console.log(yield api.user.getToken('code'));
    console.log(yield api.user.refreshToken('refresh_token'));
    console.log(yield api.user.getInfo('openid', 'access token'));
    console.log(yield api.user.auth('openid', 'access token'));
}).catch(function (err) {
    console.log(err.stack || err);
});