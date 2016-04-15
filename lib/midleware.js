var _ = require('co-lodash'),
    sha1 = require('hash-util').sha1,
    xml = require('./xml.js');

module.exports = function (token, processor) {
    return function *() {
        if (!verify(token, this.query)) throw new Error('Wechat: Not valid wechat request.');

        var msg = yield* xml.parse(this);

        this.reply = function(rep) {
            this.body = buildReply(msg, rep);
        };

        yield* processor.call(this, msg);
    };
};

function buildReply(msg, rep) {
    var robj = {
        ToUserName: msg.FromUserName,
        FromUserName: msg.ToUserName,
        CreateTime: Math.round(new Date() / 1000)
    };

    if (_.isString(rep)) {
        robj.MsgType = 'text';
        robj.Content = rep;
    } else if (_.isArray(rep)) {
        if (rep.length === 0) throw new Error('Wechat: Empty msg not supported.');
        if (rep.length > 10) throw new Error('Wechat: Article message max length is 10.');

        robj.MsgType = 'news';
        robj.ArticleCount = rep.length;
        robj.Articles = _.map(rep, function (item) {
            return { Title: item.title, Description: item.description, PicUrl: item.picUrl, Url: item.url };
        });
    } else {
        if (!rep.type) throw new Error('Wechat: No message type error.');
        robj.MsgType = rep.type;

        switch (rep.type) {
            case 'text':
                robj.Content = rep.content;
                break;
            case 'image':
                robj.Image = { MediaId: rep.mediaId };
                break;
            case 'voice':
                robj.Voice = { MediaId: rep.mediaId };
                break;
            case 'video':
                robj.Video = { Title: rep.title, Description: rep.description, MediaId: rep.mediaId };
                break;
            case 'music':
                robj.Music = { Title: rep.title, Description: rep.description, MusicUrl: rep.musicUrl, HQMusicUrl: rep.hqMusicUrl, ThumbMediaId: rep.thumbMediaId };
                break;
            default:
                throw new Error('Wechat: Not supported message type.');
        }
    }

    return xml.build(robj);
}

function verify(token, query) {
    if (query.signature && query.timestamp && query.nonce) {
        var arr = [token, query.timestamp, query.nonce];
        arr.sort();
        return query.signature.toLowerCase() === sha1(arr.join(''));
    }
}
