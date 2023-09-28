import { Bot } from "grammy";
import { env } from "./config/env.config";
console.log("Bot is running");

const bot = new Bot(env.BOT_TOKEN);
bot.start();

bot.hears("tell me joke", async (ctx) => {
    const req = await fetch("https://api.api-ninjas.com/v1/jokes", { headers: { "X-Api-Key": env.NINJAS_API_KEY } });
    const res = await req.json();
    ctx.reply(res[0].joke);
});

bot.hears(/\/echo (.+)/, (ctx) => {
    console.log(ctx.match[1]);
});
