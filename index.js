const Telegraf = require('telegraf')
const config = require('./config.json')
const bot = new Telegraf(config.token, {polling: true})
bot.start((ctx) => {
  console.log('Id пользователя:', ctx.from.id);
  return ctx.reply('Добро пожаловать!');
}); 
//Добавление нового слова в словарь
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const WizardScene = require("telegraf/scenes/wizard");
var newword = new Array()
const create = new WizardScene(
  "addword", // Имя сцены
  (ctx) => {
    ctx.reply('Введите слово для заучивания');
    newword[0] = ctx.message.text;
    return ctx.wizard.next(); 
  },
  (ctx) => {
    ctx.reply('Какой его перевод?');
    newword[1] = ctx.message.text;
    return ctx.wizard.next(); 
  },
  (ctx) => {
    ctx.reply(newword[1]);
    return ctx.scene.leave();
  }
);
// Создаем менеджера сцен
const stage = new Stage();

// Регистрируем сцену создания матча
stage.register(create);

bot.use(session());
bot.use(stage.middleware());
bot.command("addword", (ctx) => ctx.scene.enter("addword"));
console.log(newword);
bot.startPolling();