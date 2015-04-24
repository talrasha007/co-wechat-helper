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

## API
```js
var Api = wechat.Api;
var api = new Api('YOUR APPID', 'YOUR APP SECRET');
```

### 用户API
```js
var userApi = api.user;
```

 - list(nextOpenid) [获取用户列表](http://mp.weixin.qq.com/wiki/0/d0e07720fc711c02a3eab6ec33054804.html)
 - getInfo(openid) [获取用户基本信息(UnionID机制)](http://mp.weixin.qq.com/wiki/14/bb5031008f1494a59c6f71fa0f319c66.html)

### OAuth API
```js
var oauthApi = api.oauth;
```

 - getToken(code) [获取access token](http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html#.E7.AC.AC.E4.BA.8C.E6.AD.A5.EF.BC.9A.E9.80.9A.E8.BF.87code.E6.8D.A2.E5.8F.96.E7.BD.91.E9.A1.B5.E6.8E.88.E6.9D.83access_token)
 - refreshToken(refresh_token) [刷新access token](http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html#.E7.AC.AC.E4.B8.89.E6.AD.A5.EF.BC.9A.E5.88.B7.E6.96.B0access_token.EF.BC.88.E5.A6.82.E6.9E.9C.E9.9C.80.E8.A6.81.EF.BC.89)
 - getInfo(openid, access_token) [拉取用户信息](http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html#.E7.AC.AC.E5.9B.9B.E6.AD.A5.EF.BC.9A.E6.8B.89.E5.8F.96.E7.94.A8.E6.88.B7.E4.BF.A1.E6.81.AF.28.E9.9C.80scope.E4.B8.BA_snsapi_userinfo.29)
 - auth(openid, access_token) [检验授权凭证](http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html#.E9.99.84.EF.BC.9A.E6.A3.80.E9.AA.8C.E6.8E.88.E6.9D.83.E5.87.AD.E8.AF.81.EF.BC.88access_token.EF.BC.89.E6.98.AF.E5.90.A6.E6.9C.89.E6.95.88)
