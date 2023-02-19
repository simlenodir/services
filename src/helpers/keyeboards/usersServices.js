import { fetchData } from "../../utils/pg.js";

export const userServicesFunction = async (bot, chatId) => {
    const userFoundService = await fetchData(`select 
    u.user_name,
    o.order_time,
    m.master_name,
    m.master_number
    from
        users as u 
    join
        orders as o 
    on 
        o.user_id = u.user_id
    join
        master as m 
    on 
        o.master_id = m.master_id
    where u.user_id = $1`, chatId)

    const info = userFoundService[0]

    bot.sendMessage(chatId, `Mijoz ismi ${info?.user_name}\n Ustaninig ismi ${info?.master_name}\n band qilgan vaqtingiz ${info?.order_time} \n Ustaning raqami ${info.master_number} `)
}

//  JSON.stringify(userFoundService[0],null,4)