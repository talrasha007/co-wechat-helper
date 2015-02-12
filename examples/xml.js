var co = require('co'),
    xml = require('../lib/xml.js');

var txt = '<xml><ToUserName><![CDATA[toUser]]></ToUserName><FromUserName><![CDATA[fromUser]]></FromUserName><CreateTime>1348831860</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[this is a test]]></Content><MsgId>1234567890123456</MsgId></xml>';

co(function *() {
    console.log(yield* xml.parse(txt));

    var msg = {
        ToUserName: 'toUser',
        FromUserName: 'fromUser',
        CreateTime: '12345678',
        MsgType: 'news',
        ArticleCount: 2,
        Articles: [
            {
                Title: 'Good',
                Description: 'Hahaha',
                PicUrl: 'http://www.baidu.com/img/bdlogo.png',
                Url: 'http://baidu.com'
            },
            {
                Title: '支付宝钱包',
                Description: '支付宝钱包内置风靡全国的平民理财神器“余额宝”，还有还信用卡、转账、充话费、缴水电煤全部免费，有了钱包还能便宜打车、去便利店购物、售货机买饮料，更有众多银行和品牌商家的精品服务。你和1亿多钱包用户一起，好钱包，很安全，会赚钱，更懂生活！',
                PicUrl: 'http://a166.phobos.apple.com/us/r30/Purple5/v4/43/e8/ad/43e8ad87-6963-5e46-2a02-9f72648ec767/AppIcon57x57.png',
                Url: 'https://itunes.apple.com/cn/app/zhi-fu-bao-qian-bao-zhifubao/id333206289?mt=8'
            }
        ]
    };

    console.log(yield* xml.build(msg));
});