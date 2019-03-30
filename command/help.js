/**
 * 帮助提示
 * /help
 */

const helpCommand = (bot) => {
  return (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `
      *帮助:*
      1. /latest 3 获取最新3张图片
      2. /popular 1d(1d/1w/1m/1y) 获取1天(周/月/年)的popular图片
      3. /random 3 获取随机3张图片
      4. /tag bra 3 获取标签为bra的3张图片
    `, { parse_mode: "markdown" });
  }
}

module.exports = helpCommand;