/**
 * 关于
 * /about
 */

const aboutCommand = (bot) => {
  return (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, 'https://assets.yande.re/assets/logo_small-418e8d5ec0229f274edebe4af43b01aa29ed83b715991ba14bb41ba06b5b57b5.png', {
      caption: '[yande.re](https://yande.re/) Telegram bot!',
      parse_mode: 'markdown'
    })
  };
}

module.exports = aboutCommand;