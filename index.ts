import { Bot } from "grammy";
import { env } from "./config/env.config";
console.log("Bot is running");

const bot = new Bot(env.BOT_TOKEN);
bot.start();

bot.hears("tell me joke", async (ctx) => {
	const req = await fetch("https://api.api-ninjas.com/v1/jokes", {
		headers: { "X-Api-Key": env.NINJAS_API_KEY },
	});
	const res = await req.json();
	ctx.reply(res[0].joke);
});

bot.hears(/\weather (.+)/i, async (ctx) => {
	const req = await fetch(`https://api.api-ninjas.com/v1/weather?city=${ctx.match[1]}`, {
		headers: { "X-Api-Key": env.NINJAS_API_KEY },
	});
	const res = await req.json();
	const output = `\ntempratura: ${res.temp}\
                    \nshamol tezligi: ${res.wind_speed}`;
	ctx.reply(output);
});
