# co-wechat-helper
[co](https://www.npmjs.com/package/co)-style wechat api. If you are a wechat developer and do not understand Chinese, please let me know, i'll write english doc then. :)
[co](https://www.npmjs.com/package/co)风格的微信api，请参考[微信公众号API文档](http://mp.weixin.qq.com/wiki/home/index.html)。

## koa消息接口
```js
var koa = require('koa'),
    route = require('koa-route'),
    wechat = require('co-wechat-helper');

var app = koa();
app.use(route.post('/wechat', wechat('your token', function *(msg) {
    switch (msg.Content) {
        case '1':
            this.reply('文字消息');
            break;
        case '2':
            this.reply({ type: 'text', content: '还可心这样回文字消息' });
            break;
        case '3':
            this.reply({
                type: 'image',
                mediaId: 'mediaId'
            });
            break;
        case '4':
            this.reply({
                type: 'voice',
                mediaId: 'mediaId'
            });
            break;
        case '5':
            this.reply({
                type: 'video',
                title: '来段视频吧',
                description: '视频描述',
                mediaId: 'mediaId'
            });
            break;
        case '6':
            this.reply({
                type: 'music',
                title: '来段音乐吧',
                description: '一无所有',
                musicUrl: 'http://mp3.com/xx.mp3',
                hqMusicUrl: 'http://mp3.com/xx.mp3',
                thumbMediaId: 'thisThumbMediaId'
            });
            break;
        default :
            this.reply([
                {
                    title: '图文消息大图片',
                    description: '大图片',
                    picUrl: 'http://www.baidu.com/img/bdlogo.png',
                    url: 'http://baidu.com'
                },
                {
                    title: '图文消息小图片',
                    description: '支付宝钱包',
                    picUrl: 'http://a166.phobos.apple.com/us/r30/Purple5/v4/43/e8/ad/43e8ad87-6963-5e46-2a02-9f72648ec767/AppIcon57x57.png',
                    url: 'https://itunes.apple.com/cn/app/zhi-fu-bao-qian-bao-zhifubao/id333206289?mt=8'
                }
            ]);
            break;
    }
})));

var port = 10010;
console.log('Test server listening on', port);
app.listen(port);
```
