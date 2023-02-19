import { pulledCategories } from "./categories.js";

export const userServicesFunction = async (bot, chatId) => {
    console.log(bot, chatId);
    bot.sendMessage(chatId, "La havla la quvvata ilah bilah", {
        reply_markup: {
            keyboard: pulledCategories,
            resize_keyboard: true
        }
    })
}