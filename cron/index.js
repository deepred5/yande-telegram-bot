const cron = require('node-cron');
const http = require('../service/http');
const config = require('../config');
const util = require('../util');

const getPeriod = (bot, period) => async (onlyMine = false) => {
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

  const sendId = !onlyMine ? config.dailyYandeChannelId : config.myId;

  try {
    await bot.sendMessage(sendId, `${date}\n${titleMap[period]}POPULAR`);

    const mediaArr = util.group(data, 6);

    const promiseArr = mediaArr.map(async (media) => {
      try {
        await bot.sendMediaGroup(sendId, media);
        return 'sendMediaGroup success';
      } catch (error) {
        console.error('sendMediaGroup error', error);
        return 'sendMediaGroup failed';
      }
    });

    await Promise.all(promiseArr);
    bot.sendMessage(sendId, `===${date}结束===`);
  } catch (err) {
    bot.sendMessage(sendId, `===${date}结束===`);
    console.error('getPeriod error', err);
  }
};

const initTask = (bot) => {
  console.log('cron task start');
  // 每天20:00发送今日popular
  cron.schedule('0 20 * * *', getPeriod(bot, '1d'));

  // 每周21:00发送本周popular
  cron.schedule('0 21 * * 0', getPeriod(bot, '1w'));


  bot.onText(/\/test (1d|1w|1m|1y)\s?([a-zA-Z])?/, (msg, match) => {
    const resp = match[1];
    const onlyMine = match[2] ? true: false;
    if (msg.chat.id === config.myId) {
      getPeriod(bot, resp)(onlyMine);
    }
  });
}

module.exports = {
  initTask
}