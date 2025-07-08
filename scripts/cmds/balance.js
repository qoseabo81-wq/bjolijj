module.exports = {
  config: {
    name: "توازن",
    aliases: ["bal"],
    version: "1.2",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    description: {
      vi: "xem số tiền hiện có của bạn hoặc người được tag",
      en: "عرض اموالك او اموال الشخص المشار اليه"
    },
    category: "economy",
    guide: {
      vi: "   {pn}: xem số tiền của bạn" +
        "\n   {pn} <@tag>: xem số tiền của người được tag",
      en: "  {pn}: عرض رصيدك" + "\n {pn} <@الإشارة>: عرض رصيد الشخص المشار إليه"
      
    }
  },
  
  langs: {
    vi: {
      money: "Bạn đang có %1$",
      moneyOf: "%1 đang có %2$"
    },
    en: {
      money: "رصيدك %1$",
      moneyOf: "%1 رصيده %2$"
    }
  },
  
  onStart: async function({ message, usersData, event, getLang }) {
    if (Object.keys(event.mentions).length > 0) {
      const uids = Object.keys(event.mentions);
      let msg = "";
      for (const uid of uids) {
        const userMoney = await usersData.get(uid, "money");
        msg += getLang("moneyOf", event.mentions[uid].replace("@", ""), userMoney) + '\n';
      }
      return message.reply(msg);
    }
    const userData = await usersData.get(event.senderID);
    message.reply(getLang("money", userData.money));
  }
};
