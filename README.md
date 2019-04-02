# yande-telegram-bot

<a href="https://yande.re"><img src="https://assets.yande.re/assets/logo_small-418e8d5ec0229f274edebe4af43b01aa29ed83b715991ba14bb41ba06b5b57b5.png"></a>


### [yande5_bot](https://t.me/yande5_bot)

<img src="https://cdn5.telesco.pe/file/VWpfbao9_oubq3pz5RRbjRHYfmqpp9-ZU4iaQs4abX3Kya1saJESFRSLdbsfJdzMe8ixdTji4Y0GRLZHnt6kKJlrzSzpolKJL3J-gyyPTLT4KHHITNVWMX3mBZz93zFmzJzDjrzvAgUZQXlMnq5TYRrgho53rzCuz-u8rfNCjAz1QswXatAItsNvJaG2_GypWEJLbC_D0_Ai0ZOVCg6U0qoF6fMmcg6XJxLdaxCBhHHTw2hZo5ZJSGm7cOraY3lXo4ULLW9EStgW-dvJlSjLLTyn6qoXSWcdRckM1PY1H0DmITZTbUjc_GaOdZRBmXJbPhO8cf_ItFwNaYDr4ikC2A.jpg" width="66" style="border-radius: 50%;">

Telegram搜索`@yande5_bot`或者点击这里[yande5_bot](https://t.me/yande5_bot)

使用方法:
* /latest 3 获取最新3张图片
* /popular 1d(1d/1w/1m/1y) 获取1天(天/周/月/年)的popular图片
* /random 3 获取随机3张图片
* /tag bra 3 获取标签为bra的3张图片
* /help 帮助信息
* /about 关于
* /start 开始使用

### [dailyYande](https://t.me/dailyYande)

<img src="https://cdn5.telesco.pe/file/QKPXV5ZsqzBEgR2jK2nuVlPOZXkQKXQq5kVj7aEU8WF8rnoXtzJzsUIW6meeunn-kh7xNp_vL3Hi_6YCT05L64X-Mze_3uvt_KVwT4sh57HBDCUQCSfLd_pAbMoPbD-_gYWnLyLtONcWGZ2CFU7kRMnoJepQwR9uzu3kiMUWVNMkswTm96R-YawuvCD5Ry_iRMOAAeGKtzHMCCK2PBbJKdWiiSBCMo1EV3zkhxqrPnwcbhagkvwp7rOZEgFhMhXCOxBKK2_lSExUJ8Ld9wk8ZC8tYtzin2YuM0k2HNEq_0FCKAJi1obISjsAovyF2crN51NxqK1sDB051KyxH1AO7A.jpg" width="66" style="border-radius: 50%;">

Telegram搜索`@dailyYande`或者点击这里[dailyYande](https://t.me/dailyYande)

使用`@yande5_bot`机器人管理`@dailyYande` channel，每晚20:00准时发送当日popular图片


### 部署
参考[从零开始写一个Telegram Bot](http://anata.me/2019/03/30/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E5%86%99%E4%B8%80%E4%B8%AATelegram-Bot/#%E7%BA%BF%E4%B8%8A%E9%83%A8%E7%BD%B2)

`config.js`
```javascript
module.exports = {
  token: '你的token',
  socksPassword: '本地开发时的ss梯子密码',
  url: 'webhook模式下的转发地址',
  port: 'webhook模式下express监听端口',
  myId: '用户Id',
  dailyYandeChannelId: '频道Id' // 需要bot为该频道的管理员
}
```

`nginx配置`
```conf
# 代理yande bot
location /bot${你的token} {
    proxy_pass http://127.0.0.1:9000; # 对应config.js里面的port端口
    proxy_http_version 1.1;
    proxy_set_header X_FORWARDED_PROTO https;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
}
```