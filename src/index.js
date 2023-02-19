import TelegramBot from "node-telegram-bot-api"
import dotenv from "dotenv"
dotenv.config()

import { usersSelect } from "./helpers/keyeboards/usersSelect.js"
import { userMenu } from "./helpers/keyeboards/userServiceMenu.js"
import { fetchData } from "./utils/pg.js"
import { userServicesFunction } from "./helpers/keyeboards/usersServices.js"
import {userBackToMenu } from "./helpers/keyeboards/userBack.js"
import {allServices} from "./helpers/keyeboards/allServices.js"
import { changeUserInfo } from "./helpers/keyeboards/changeUser.js"
import {changeUserName} from "./helpers/keyeboards/changerUsername.js"

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

        bot.onReplyToMessage((await userContact)?.chat.id, (await userContact).message_id, async Number => {

            const newUser = await fetchData(`INSERT INTO users(user_id , user_name,user_number) values($1 ,$2 ,$3) returning *`, chatId, msg.text, Number.text)

            const userContact = await bot.sendMessage(Number.chat.id, 'Xizmatlarni tanlang', {
                reply_markup: {
                    keyboard: userMenu(),
                    force_reply: true,
                    resize_keyboard: true
                }
            })

        })
    }

})

bot.on('message', async msg => {
    const chatId = msg.chat.id
    newUser.id = chatId

    if (msg.text == "XIZMATLAR") {
        const services = await allServices(bot, chatId)
    }

})

bot.on('message', async msg => {
    const chatId = msg.chat.id
    newUser.id = chatId

    if (msg.text == "TANLANGAN XIZMATLAR") {
        const userServices = await userServicesFunction(bot, chatId)
    }
})

bot.on('message', async msg => {
    const chatId = msg.chat.id
    if (msg.text == "bak to menu") {
       const userBack = await userBackToMenu(bot, chatId)
    }
})

bot.on('message' , async msg => {
    const chatId = msg.chat.id
   
    if (msg.text == "MA`LUMOTLARNI O`ZGARTIRISH") {
       const userUserChange= await changeUserInfo(bot, chatId)
    }
})

bot.on('callback_query', async msg => {
    const chatId = msg?.from?.id
    const data = msg.data
   
    if (data == 'name') {
        const changename =await changeUserName(bot, chatId) 
        
        await bot.onReplyToMessage(chatId, async name => {
            const updatUser = await fetchData(`update users set user_name = $1 where user_id = $2 returning *`, name, chatId)
        })
        await bot.sendMessage(chatId, 'Ismingiz o`zgardi')
    }

    if (data == 'number') {
        const changename =await changeUserName(bot, chatId) 
        
        await bot.onReplyToMessage(chatId, async name => {
            const updatUser = await fetchData(`update users set user_name = $1 where user_id = $2 returning *`, name, chatId)
            
        })
        await bot.sendMessage(chatId, 'Raqamingiz o`zgardi')
    }
})