var Request = require('./request.js'),
    UserApi = require('./user.js');

module.exports = function (appid, secret) {
    var request = new Request(appid, secret);

    this.user = new UserApi(request);
};