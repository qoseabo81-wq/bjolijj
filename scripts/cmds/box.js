const axios = require('axios');
const request = require('request');
const fs = require("fs");
module.exports = {
  config: {
    name: "مجموعة",
    aliases: ["box"],
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 1,
    shortDescription: "set admin/change group photo,emoji,name",
    longDescription: "",
    category: "admin",
    guide: {
      vi: "{pn} [admin,emoji,image,name]",
      en: "{pn} اسم <الاسم> لتغيير اسم المجموعة\n{pn} رمز <الرمز> لتغيير الرمز التعبيري للمجموعة\n{pn} صورة <الرد على الصورة> لتغيير صورة المجموعة\n{pn} إضافة [@الإشارة] لتعيين مشرف جديد\n{pn} حذف [@الإشارة] لإزالة مشرف من المجموعة\n{pn} معلومات لعرض تفاصيل المجموعة"
      
    }
  },
  onStart: async function({ message, api, event, args, getText }) {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    if (args.length == 0) return api.sendMessage(`الأوامر المتاحة:\n?box emoji [الرمز] لتغيير الرمز التعبيري\n?box name [الاسم الجديد] لتغيير اسم المجموعة\n?box image [الرد على الصورة] لتغيير صورة المجموعة\n?box admin [الإشارة إلى العضو] لمنح صلاحية المشرف\n?box info لعرض معلومات المجموعة`, event.threadID, event.messageID);
    if (args[0] == "name") {
      var content = args.join(" ");
      var c = content.slice(4, 99) || event.messageReply.body;
      api.setTitle(`${c } `, event.threadID);
    }
    if (args[0] == "emoji") {
      const name = args[1] || event.messageReply.body;
      api.changeThreadEmoji(name, event.threadID)
    }
    if (args[0] == "add") {
      if (Object.keys(event.mentions) == 0) return api.changeAdminStatus(event.threadID, args.join(" "), true);
      else {
        for (var i = 0; i < Object.keys(event.mentions).length; i++) api.changeAdminStatus(event.threadID, `${Object.keys(event.mentions)[i]}`, true)
        return;
      }
    }
    else if (args[0] == "del") {
      if (Object.keys(event.mentions) == 0) return api.changeAdminStatus(event.threadID, args.join(" "), true);
      else {
        for (var i = 0; i < Object.keys(event.mentions).length; i++) api.changeAdminStatus(event.threadID, `${Object.keys(event.mentions)[i]}`, false)
        return;
      }
    }
    if (args[0] == "image") {
      if (event.type !== "message_reply") return api.sendMessage("❌ يرجى الرد على  الصورة او الفيديو او الملف الصوتي المطلوب", event.threadID, event.messageID);
      if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ You must reply to a certain audio, video, or photo", event.threadID, event.messageID);
      if (event.messageReply.attachments.length > 1) return api.sendMessage(`Please reply only one audio, video, photo!`, event.threadID, event.messageID);
      var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/assets/any.png"), event.threadID, () => fs.unlinkSync(__dirname + "/assets/any.png"));
      return request(encodeURI(event.messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname + '/assets/any.png')).on('close', () => callback());
    };
    if (args[0] == "info") {
      var threadInfo = await api.getThreadInfo(event.threadID);
      let threadMem = threadInfo.participantIDs.length;
      var gendernam = [];
      var gendernu = [];
      var nope = [];
      for (let z in threadInfo.userInfo) {
        var gioitinhone = threadInfo.userInfo[z].gender;
        
        var nName = threadInfo.userInfo[z].name;
        
        if (gioitinhone == 'MALE') {
          gendernam.push(z + gioitinhone);
        } else if (gioitinhone == 'FEMALE') {
          gendernu.push(gioitinhone);
        } else {
          nope.push(nName);
        }
      }
      var nam = gendernam.length;
      var nu = gendernu.length;
      let qtv = threadInfo.adminIDs.length;
      let sl = threadInfo.messageCount;
      let icon = threadInfo.emoji;
      let threadName = threadInfo.threadName;
      let id = threadInfo.threadID;
      var listad = '';
      var qtv2 = threadInfo.adminIDs;
      for (let i = 0; i < qtv2.length; i++) {
        const infu = (await api.getUserInfo(qtv2[i].id));
        const name = infu[qtv2[i].id].name;
        listad += '•' + name + '\n';
      }
      let sex = threadInfo.approvalMode;
      var pd = sex == false ? 'Turn off' : sex == true ? 'turn on' : 'Kh';
      var pdd = sex == false ? '❎' : sex == true ? '✅' : '⭕';
      var callback = () =>
        api.sendMessage(
          {
            body: `اسم المجموعة: ${threadName}\nالمعرف: ${id}\n${pdd} حالة الموافقة: ${pd}\nالرمز التعبيري: ${icon}\n- معلومات المجموعة:\nعدد الأعضاء: ${threadMem}\n👨‍🦰 الذكور: ${nam} \n👩‍🦰 الإناث: ${nu}\n\n🕵️‍♂️ المشرفون (${qtv}):\n${listad}\nعدد الرسائل: ${sl}`,
            
            attachment: fs.createReadStream(__dirname + '/assets/any.png')
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + '/assets/any.png'),
          event.messageID
        );
      return request(encodeURI(`${threadInfo.imageSrc}`))
        .pipe(fs.createWriteStream(__dirname + '/assets/any.png'))
        .on('close', () => callback());
      
    }
  }
                      }
