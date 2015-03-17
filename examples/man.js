var co = require('co'),
    api = new (require('../').Api)('YOUR APPID', 'YOU APP SECRET');

co(function *() {
    console.log(yield api.getAccessToken());
}).catch(function (err) {
    console.log(err.stack || err);
});