var _ = require('codash'),
    rawBody = require('raw-body'),
    xml2js = require('xml2js');

exports.build = function *(obj) {

};

exports.parse = function *(ctx) {
    if (_.isString(ctx)) return yield* parseString(ctx);

    var req = ctx.req || ctx.request.req,
        body = yield function (cb) { rawBody(req, { encoding: 'utf-8' }, cb); };

    return yield* parseString(body);
};

function *parseString(txt) {
    var item = yield function (cb) { xml2js.parseString(txt, cb); };

    return _.reduce(item.xml, function (m, v, k) {
        m[k] = _.isArray(v) && v.length === 1 ? v[0] : v;
        return m;
    }, {});
}
