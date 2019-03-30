const cron = require('node-cron');
const http = require('../service/http');
const config = require('../config');

// 每晚20:00发送今日popular
const initTask = (bot) => {
  console.log('cron task start');
  cron.schedule('0 20 * * *', async () => {
    const { data = [] } = await http.getYandePopularPic({ period: '1d' });
    bot.sendMessage(config.dailyYandeChannelId, '每日POPULAR');
    data.forEach(img => {
      bot.sendPhoto(config.dailyYandeChannelId, img.file_url);
    });
  });
}

module.exports = {
  initTask
}