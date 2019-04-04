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
    '1d': '本日',
    '1w': '本周',
    '1m': '本月',
    '1y': '本年'
  };

  const date = util.dateFormat();

  const sendId = config.dailyYandeChannelId;

  await bot.sendMessage(sendId, `${date}\n${titleMap[period]}POPULAR`);

  const mediaArr = util.group(data, 6);

  const promiseArr = mediaArr.map(async (media) => {
    try {
      await bot.sendMediaGroup(sendId, media);
      return 'sendMediaGroup success';
    } catch(err) {
      console.error('sendMediaGroup error', error);
      return 'sendMediaGroup failed';
    }
  });

  await Promise.all(promiseArr);
  bot.sendMessage(sendId, `===${date}结束===`);
};

const initTask = (bot) => {
  console.log('cron task start');
  // 每天20:00发送今日popular
  cron.schedule('0 20 * * *', getPeriod(bot, '1d'));

  // 每周21:00发送本周popular
  cron.schedule('0 21 * * 0', getPeriod(bot, '1w'));

  
  bot.onText(/\/sendPopular (.+)/, (msg, match) => {
    const resp = match[1];
    if (msg.chat.id === config.myId) {
      getPeriod(bot, resp)();
    }
  });
}

module.exports = {
  initTask
}