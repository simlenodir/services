import TelegramBot from "node-telegram-bot-api"
import dotenv from "dotenv"
dotenv.config()

import { usersSelect } from "./helpers/keyeboards/usersSelect.js"

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true })

let newUser = {}
let son = 0

bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, `Salom ${msg.from.first_name} bizning botga hush kelibsiz`, {
        reply_markup: {
            keyboard:
                [
                    [
                        { text: "Ro'yhatdan o'tish" }
                    ]
                ],
            resize_keyboard: true
        }
    })
})


bot.on('message', async msg => {
    const chatId = msg.chat.id
    newUser.id = chatId

    if (msg.text == "Ro'yhatdan o'tish") {

        bot.sendMessage(chatId, "choose role", {
            reply_markup: {
                keyboard: [usersSelect()],
                resize_keyboard: true
            }
        })
    }



    if (msg.text == "Mijoz") {
        son = 1;
        const userName = await bot.sendMessage(msg.chat.id, 'Ismingizni yozing', {
            reply_markup: {
                force_reply: true
            }
        })
    }
})

bot.on('message', async msg => {
    const chatId = msg.chat.id

    if (msg.reply_to_message?.text == "Ismingizni yozing" && son === 1) {
        son = 2
        const userContact = bot.sendMessage(chatId, 'Telfon raqamingizni kiriting', {
            reply_markup: {
                force_reply: true
            }   
        })
        // bot.sendMessage(chatId, `Sizning ismingiz ${msg.text} tasdiqlaysizmi`)
        newUser.name = msg.text
        newUser.user_name = msg.chat.first_name
        console.log( msg.text);
        bot.onReplyToMessage((await userContact)?.chat.id, (await userContact).message_id, async Number => {
            const userContact = await bot.sendMessage(Number.chat.id, 'Ismingizni yozing', {
                reply_markup: {
                    force_reply: true
                }
            })
        
           console.log( Number.text, );
    
        })
    }

})
console.log(newUser);

