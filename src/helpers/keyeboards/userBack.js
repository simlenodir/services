import { userMenu } from "./userServiceMenu.js"

export const userBackToMenu = (bot, chatId) => {
    return  bot.sendMessage(chatId, "Menuga qaytish", {
        reply_markup: {
            keyboard: userMenu(),
            resize_keyboard: true
        }
    })
}