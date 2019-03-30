/**
 * 获取标签为no_bra的10张图片
 * /tag no_bra 10 
 */

const sendPicCommand = require('./base');
const http = require('../service/http');

const tagCommand = (bot) => {
  return async (msg, match) => {
    const chatId = msg.chat.id;
    const tag = match[1];
    let amount = parseInt(match[2]) || 5;
    if (amount > 20) {
      amount = 20;
    }
    const { data = [] } = await http.getYandePic({ tags: tag, limit: amount });
    sendPicCommand(bot)(chatId, data);
  }
}

module.exports = tagCommand;