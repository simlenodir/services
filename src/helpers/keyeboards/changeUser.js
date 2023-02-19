export const changeUserInfo = (bot, chatId) => {
    
      bot.sendMessage(chatId, "Menuga qaytish", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'ismingizni o`zgartirish', callback_data: 'name' },
              { text: 'Telefon raqamingizni o`zgartirish', callback_data: 'number' },
            ],
          ],
        },
      });
}