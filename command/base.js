const getTagsHtml = (tags) => {
  return tags.map((tag, index) => {
    return `${index + 1}: ${tag}\n`;
  }).join('');
};


const getInlinekeyboard = (tags, command) => {
  return tags.map(tag => {
    return [{
      text: tag,
      callback_data: JSON.stringify({
        command,
        data: tag
      })
    }]
  });
}

const sendPicCommand = (bot) => {
  return (chatId, pics) => {
    pics.forEach(img => {
      const tagArr = img.tags.split(' ').filter(tag => tag.length < 30).slice(0, 6);
      const tagsHtml = getTagsHtml(tagArr);
      const inlineKeyboard = getInlinekeyboard(tagArr, '/tag');

      bot.sendPhoto(chatId, img.file_url, {
        caption: `tags:\n${tagsHtml}`,
        parse_mode: 'html',
        reply_markup: {
          inline_keyboard: inlineKeyboard
        }
      });
    });
  }
};

module.exports = sendPicCommand;