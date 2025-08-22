const axios = require("axios");

module.exports = {
    config: {
        name: "شخصيتي",
        version: "2.1",
        hasPermssion: 0,
        credits: "احمد + تعديل GPT",
        description: "يظهر لك شخصيتك في الأنمي (عشوائي من AnimeChan API)",
        commandCategory: "جديد",
        usages: "[شخصيتي]",
        cooldowns: 5,
    },

    onStart: async function ({ api, event }) {
        try {
            // إرسال رسالة انتظار
            const waitMsg = await api.sendMessage("⏳ جاري اختيار شخصيتك في الأنمي...", event.threadID);

            // جلب شخصية عشوائية من AnimeChan
            const response = await axios.get("https://animechan.xyz/api/random");
            const data = response.data;

            if (!data || !data.character) {
                return api.sendMessage("❌ لم أستطع جلب شخصية حالياً.", event.threadID, event.messageID);
            }

            // حذف رسالة الانتظار
            await api.unsendMessage(waitMsg.messageID);

            // إرسال النتيجة
            return api.sendMessage(
                `✨ شخصيتك في الأنمي هي:\n\n👤 الاسم: ${data.character}\n🎬 الأنمي: ${data.anime}\n💬 اقتباس: "${data.quote}"`,
                event.threadID,
                event.messageID
            );
        } catch (error) {
            console.error(error);
            return api.sendMessage(`❌ خطأ: ${error.message}`, event.threadID, event.messageID);
        }
    },
};
