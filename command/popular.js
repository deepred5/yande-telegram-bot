/**
 * 获取1天(周/月/年)的popular图片 
 * /popular 1d (1d 1w 1m 1y)
 */

const http = require('../service/http');
const sendPicCommand = require('./base');

const popularCommand = (bot) => {
  return async (msg, match) => {
    const chatId = msg.chat.id;
    const period = match[1] || '1d';
    const periodType = ['1d', '1w', '1m', '1y'];
    if (periodType.indexOf(period) < 0) {
      bot.sendMessage(chatId, `请输入正确参数: ${periodType.join('; ')}`);
      return;
    }
    const { data = [] } = await http.getYandePopularPic({ period })

    sendPicCommand(bot)(chatId, data);
  }
}

module.exports = popularCommand;