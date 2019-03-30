/**
 * 随机展示10张图片
 * /random 10
 */

const http = require('../service/http');
const sendPicCommand = require('./base');

const randomCommand = (bot) => {
  return async (msg, match) => {
    const chatId = msg.chat.id;
    let amount = parseInt(match[1]) || 5;
    if (amount > 20) {
      amount = 20;
    }
    const { data = [] } = await http.getYandePic({ limit: amount, tags: 'order:random' })
    
    sendPicCommand(bot)(chatId, data);
  }
}

module.exports = randomCommand;