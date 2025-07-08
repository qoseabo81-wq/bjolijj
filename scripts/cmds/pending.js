module.exports = {
  config: {
    name: "قبول",
    version: "1.0",
    author: "ArYan 🐔",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "ArYan"
  },
  
  langs: {
    en: {
      invaildNumber: "%1 ليس رقمًا صالحًا",
      cancelSuccess: "تم رفض %1 مجموعة!",
      approveSuccess: "تمت الموافقة على %1 مجموعات بنجاح!",
      cantGetPendingList: "لا يمكن الحصول على قائمة الانتظار!",
      returnListPending: "»「الانتظار」«❮ إجمالي عدد المجموعات في الانتظار هو: %1 مجموعة ❯\n\n%2",
      returnListClean: "「الانتظار」لا توجد مجموعات في قائمة الانتظار"
    }
  },
  
  onReply: async function({ api, event, Reply, getLang, commandName, prefix }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;
    
    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
      const index = (body.slice(1, body.length)).split(/\s+/);
      for (const ArYanIndex of index) {
        console.log(ArYanIndex);
        if (isNaN(ArYanIndex) || ArYanIndex <= 0 || ArYanIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", ArYanIndex), threadID, messageID);
        api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[ArYanIndex - 1].threadID);
        count += 1;
      }
      return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    }
    else {
      const index = body.split(/\s+/);
      for (const ArYanIndex of index) {
        if (isNaN(ArYanIndex) || ArYanIndex <= 0 || ArYanIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", ArYanIndex), threadID, messageID);
        api.sendMessage(`successful add ✅`, Reply.pending[ArYanIndex - 1].threadID);
        count += 1;
      }
      return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
  },
  
  onStart: async function({ api, event, getLang, commandName }) {
    const { threadID, messageID } = event;
    
    var msg = "",
      index = 1;
    
    try {
      var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
      var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID) }
    
    const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
    
    for (const ArYan of list) msg += `${index++}/ ${ArYan.name}(${ArYan.threadID})\n`;
    
    if (list.length != 0) return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        author: event.senderID,
        pending: list
      })
    }, messageID);
    else return api.sendMessage(getLang("returnListClean"), threadID, messageID);
  }
};
