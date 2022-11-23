require('dotenv').config();
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');
const doApiRequest = require("./utils/doAPIRequest");
// const mockData = require("./mock.json");
const prepareData = require("./utils/prepareData");

const token = process.env.BOT_TOKEN;
const appId = process.env.ADZUNA_APPID;
const apiKey = process.env.ADZUNA_APIKEY;
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Hello! Bot started');

  cron.schedule('0 10 * * *', async () => {
    const apiData = await doApiRequest(appId, apiKey, 'gb');

    if (!apiData) return bot.sendMessage(chatId, 'API fetch failed :(');
  
    const preparedData = prepareData(apiData);
    const promises = preparedData.map(
      (item) => bot.sendMessage(chatId, item, { parse_mode: 'Markdown' })
    );
    await Promise.all(promises);
  });

});

// url https://api.adzuna.com/v1/api/jobs/gb/search/1
// https://api.adzuna.com/v1/api
// https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id={YOUR_APP_ID}&app_key={YOUR_APP_KEY}&what=...




