module.exports = {
  config: {
    name: "طلب",
    aliases: ["in"],
    version: "1.0",
    author: "ArYan",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "hello goatbot inbox no prefix file enjoy the cmmand @ArYan"
    },
    longDescription: {
      en: ""
    },
    category: "fun",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    },
    id: {
      gg: ""
    }
  },
  onStart: async function({ api, event, args, message }) {
    try {
      const query = encodeURIComponent(args.join(' '));
      message.reply("✅ تم ارسال طلب الموافقة", event.threadID);
      api.sendMessage(`❀━━━━〖 رسالة الموافقة 〗━━━━❀\n\n
✅ تمت الموافقة على مجموعتكم بنجاح! \n
━━━━━━━━━━━━━━━\n
👨‍💻 ❀〖 معلومات المطور 〗❀\n
اسم المطور: صلاح الدين \n
🌐 رابط حساب المطور: [https://www.facebook.com/Rako.San.r.s] \n
━━━━━━━━━━━━━━━\n
🤖 ❀〖 معلومات البوت 〗❀\n
اسم البوت: مشمش \n
📝 أوامر لمزيد من المعلومات: \n
🔹 {pn} أوامر \n
🔹 {pn} مساعدة \n
━━━━━━━━━━━━━━━\n
🎉 شكرًا لكم على الانضمام إلى بوت مشمش! \n
📲 يمكنكم الآن استخدام أوامر البوت في مجموعتكم. \n
👍 نتمنى لكم تجربة ممتعة! \n`, event.senderID);
    } catch (error) {
      console.error("Error bro: " + error);
    }
  }
  }
