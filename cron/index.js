const cron = require('node-cron');
const http = require('../service/http');
const config = require('../config');
const util = require('../util');

const getPeriod = (bot, period) => async () => {
  let { data = [] } = await http.getYandePopularPic({ period });

  data = data.filter((item) => item.file_size < 4.8 * 1024 * 1024).map((item) => ({
    type: 'photo',
    media: item.file_url
  }));

  const titleMap = {
    '1d': '每日',
    '1w': '每周',
    '1m': '每月',
    '1y': '每年'
  };

  bot.sendMessage(config.dailyYandeChannelId, `${titleMap[period]}POPULAR`);

  const mediaArr = util.group(data, 6);

  mediaArr.forEach((media) => {
    bot.sendMediaGroup(config.dailyYandeChannelId, media);
  });
};

const initTask = (bot) => {
  console.log('cron task start');
  // 每天20:00发送今日popular
  cron.schedule('0 20 * * *', getPeriod(bot, '1d'));

  // 每周21:00发送本周popular
  cron.schedule('0 21 * * 0', getPeriod(bot, '1w'));

  // 测试发送
  bot.onText(/\/testChannel/, (msg, match) => {
    if (msg.chat.id === 874622480) {
      getPeriod(bot, '1m')();
    }
  });
}

module.exports = {
  initTask
}