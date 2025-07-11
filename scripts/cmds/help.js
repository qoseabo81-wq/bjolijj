const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "اوامر",
    version: "1.0",
    author: "𝙺-𝙰𝚉𝚄𝙼𝙰",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "عرض استخدام الأمر وقائمة جميع الأوامر"
    },
    description: {
      en: "عرض استخدام الأمر وقائمة جميع الأوامر مع معلومات مفصلة"
    },
    category: "معلومات",
    guide: {
      en: "{pn} [فارغ | <اسم الأمر>]"
    },
    priority: 1
  },
  onStart: async function ({ message, args, event, role }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      let msg = "❀━━━━〖 الاوامـر 〗━━━━❀\n\n";
      const categories = {};

      for (const [name, value] of commands) {
        if (value.config.role > role) continue;
        const category = value.config.category || "غير مصنف";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories)
        .filter(cat => cat !== "معلومات")
        .forEach(category => {
          
          
          const names = categories[category].commands.sort();
          names.forEach(cmd => {
            msg += `» : ${cmd.padEnd(15)}\n`;
          });
          
        });

      msg += `نازي يحتوي حاليًا على ${commands.size} أوامر. استخدم ${prefix}help متبوعًا باسم الأمر لمزيد من التفاصيل حول الأمر`;
      msg += `\n─╼━━━━━━━━╾─
     Rako San    
─━━━━━━━━━╾─\n`;
      await message.reply({ body: msg });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`الأمر "${commandName}" غير موجود`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "غير معروف";
        const longDescription = configCommand.longDescription?.ar || "لا يوجد وصف";
        const guideBody = configCommand.guide?.ar || "لا يوجد دليل";
        const usage = guideBody.replace(/{pn}/g, prefix + configCommand.name);

        let response = `✦ اسم ✦\n  ${configCommand.name}\n\n`;
        response += `❖ 𝙸𝙽𝙵𝙾 ❖\n`;
        response += `  📜 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${longDescription}\n`;
        response += `  🔗 𝙰𝚕𝚒𝚊𝚜: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Aucun"}\n`;
        response += `  🏆 𝚁𝙾𝙻𝙴: ${roleText}\n`;
        response += `  ⏳ 𝚃𝚎𝚖𝚙𝚜 d'attente: ${configCommand.countDown || 1}s\n`;
        response += `  🛠️ 𝙰𝚞𝚝𝚎𝚞𝚛: ${author}\n\n`;
        response += `❖ 𝚄𝚂𝙰𝙶𝙴 ❖\n  ${usage}\n\n`;
        response += `❖ 𝙽𝙾𝚃𝙴𝚂 ❖\n  🔹 Le contenu entre <XXXXX> peut être modifié\n  🔹 Le contenu entre [a|b|c] signifie a ou b ou c\n`;

        await message.reply(response);
      }
    }
  }
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (جميع المستخدمين)";
    case 1:
      return "1 (مديرو المجموعة)";
    case 2:
      return "2 (مديرو البوت)";
    default:
      return "دور غير معروف";
  }
	    }
