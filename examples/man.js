var co = require('co'),
    api = new (require('../').Api)('YOUR APPID', 'YOU APP SECRET');

co(function *() {
    var accessToken = yield* api.getAccessToken();
    console.log(accessToken);
    console.log(yield* api.listIp());
}).catch(function (err) {
    console.log(err.stack || err);
});