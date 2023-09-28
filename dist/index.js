"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const env_config_1 = require("./config/env.config");
console.log("Bot is running");
const bot = new grammy_1.Bot(env_config_1.env.BOT_TOKEN);
bot.start();
bot.hears("tell me joke", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield fetch("https://api.api-ninjas.com/v1/jokes", { headers: { "X-Api-Key": env_config_1.env.NINJAS_API_KEY } });
    const res = yield req.json();
    ctx.reply(res[0].joke);
}));
bot.hears(/\/echo (.+)/, (ctx) => {
    console.log(ctx.match[1]);
});
