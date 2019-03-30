const cron = require('node-cron');
const http = require('../service/http');
const config = require('../config');

const getPeriod = (bot, period) => async () => {
  const { data = [] } = await http.getYandePopularPic({ period });
  const titleMap = {
    '1d': '每日',
    '1w': '每周'
  }
  bot.sendMessage(config.dailyYandeChannelId, `${titleMap[period]}POPULAR`);
  data.forEach(img => {
    bot.sendPhoto(config.dailyYandeChannelId, img.file_url);
  });
};

const initTask = (bot) => {
  console.log('cron task start');
  // 每天20:00发送今日popular
  cron.schedule('0 20 * * *', getPeriod(bot, '1d'));

  // 每周21:00发送本周popular
  cron.schedule('0 21 * * 0', getPeriod(bot, '1w'));
}

module.exports = {
  initTask
}