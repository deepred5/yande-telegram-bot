/**
 * 获取最新10张图片
 * /latest 10
 */

const http = require('../service/http');
const sendPicCommand = require('./base');

const latestCommand = (bot) => {
  return async (msg, match) => {
    const chatId = msg.chat.id;
    let amount = parseInt(match[1]) || 5;
    if (amount > 20) {
      amount = 20;
    }
    const { data = [] } = await http.getYandePic({ limit: amount })
    
    sendPicCommand(bot)(chatId, data);
  }
}

module.exports = latestCommand;