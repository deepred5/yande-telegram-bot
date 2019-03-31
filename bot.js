const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');

const config = require('./config');
const command = require('./command');

let botConfig = {};

if (process.env.dev) {
  botConfig.polling = true; // polling模式
  botConfig.request = { // 设置代理
    agentClass: Agent,
    agentOptions: {
      socksPassword: config.socksPassword
    }
  }
}

const { token, url } = config;

const bot = new TelegramBot(token, botConfig);

if (!process.env.dev) {
  bot.setWebHook(`${url}/bot${token}`);
}

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

const {
  latestCommand,
  tagCommand,
  randomCommand,
  popularCommand,
  helpCommand,
  aboutCommand
} = command;

const helpHandler = helpCommand(bot);
const latestHandler = latestCommand(bot);
const tagHandler = tagCommand(bot);
const randomHandler = randomCommand(bot);
const popularHandler = popularCommand(bot);
const aboutHandler = aboutCommand(bot);

bot.onText(/\/start/, (msg, match) => {
  aboutHandler(msg, match);
  helpHandler(msg, match);
});
bot.onText(/\/help/, helpHandler);
bot.onText(/\/about/, aboutHandler);
bot.onText(/\/latest\s?(\d+)?/, latestHandler);
bot.onText(/\/random\s?(\d+)?/, randomHandler);
bot.onText(/\/tag ([a-zA-Z0-9_]+)\s?(\d+)?/, tagHandler);
bot.onText(/\/popular\s?(.+)?/, popularHandler);

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, `Received your message: ${msg.text}`);
// });

// admin权限，向channel发送消息
bot.onText(/\/channel (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  if (chatId === config.myId) {
    bot.sendMessage(config.dailyYandeChannelId, resp);
  }
});

bot.on("callback_query", function (data) {
  const callbackData = JSON.parse(data.data);
  if (callbackData.command === '/tag') {
    const match = ['/tag', callbackData.data, 5];
    const msg = {
      chat: {
        id: data.from.id
      }
    };
    tagHandler(msg, match).then(() => {
      bot.answerCallbackQuery(data.id, `搜索${callbackData.data}成功`);
    }).catch((err) => {
      bot.answerCallbackQuery(data.id, `搜索${callbackData.data}失败`);
    });
    return;
  }
  bot.answerCallbackQuery(data.id, '');
});


process.on('uncaughtException', function (error) {
  console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
});
process.on('unhandledRejection', function (error) {
  console.log("\x1b[31m", "Error: ", error.message, "\x1b[0m");
});

module.exports = bot;