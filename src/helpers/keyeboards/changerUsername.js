export const changeUserName = async(bot, chatId) => {
    return await  bot.sendMessage(chatId, "Imingizni kiriting",{
        reply_markup: {
            force_reply: true,
            resize_keyboard: true
        }
    }) 
}