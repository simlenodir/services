import { pulledCategories } from "./categories.js"

export const allServices = (bot, chatId) => {
    return bot.sendMessage(chatId, "Xizmatlarimizni tanlang", {
            reply_markup: {
                keyboard: pulledCategories,
                resize_keyboard: true
            }
    })
}