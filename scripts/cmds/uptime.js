 const fs = require("fs");
 const os = require("os");
 
 const statsFile = "./stats.json";
 
 module.exports = {
   config: {
     name: "ابتايم",
     aliases: ["upt", "up"],
     version: "2.1",
     author: "OtinXSandip - Modded by L'Uchiha Perdu",
     role: 0,
     shortDescription: {
       en: "Displays bot uptime, system status, and more."
     },
     longDescription: {
       en: "Shows the bot's uptime, system status, user statistics, and more useful details."
     },
     category: "system",
     guide: {
       en: "Use {p}uptime to check bot uptime and system capacity."
     }
   },
   onStart: async function({ api, event, usersData, threadsData }) {
     try {
       if (!fs.existsSync(statsFile)) {
         fs.writeFileSync(statsFile, JSON.stringify({ totalCommands: 0 }, null, 2));
       }
       
       
       let stats = JSON.parse(fs.readFileSync(statsFile, "utf8"));
       
       stats.totalCommands += 1;
       fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
       
       // Infos système
       const uptime = process.uptime();
       const totalUsers = await usersData.getAll();
       const totalGroups = await threadsData.getAll();
       const cpuUsage = os.loadavg()[0] * 10;
       const osUptime = os.uptime();
       const days = Math.floor(uptime / 86400);
       const hours = Math.floor((uptime % 86400) / 3600);
       const minutes = Math.floor((uptime % 3600) / 60);
       const seconds = Math.floor(uptime % 60);
       const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2);
       const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2);
       const usedMemory = (totalMemory - freeMemory).toFixed(2);
       const speed = (Math.random() * (4000 - 1000) + 1000).toFixed(0);
       let status = "🟢| 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭";
       if (cpuUsage > 70 || usedMemory / totalMemory > 0.8) status = "🟡| 𝐌𝐨𝐲𝐞𝐧";
       if (cpuUsage > 90 || usedMemory / totalMemory > 0.9) status = "🔴| 𝐅𝐚𝐢𝐛𝐥𝐞";
       
       const message = `╭─⌾🎯نازي بوت🎯 │ الاسم: نازي بوت │ البادئة: * │ المالك: راكو ╰────────⌾ 
╭─⌾⏰ وقت التشغيل ⏰ │ 🎶✨ ${days} أيام✨🎶 │ 🎶✨ ${hours} ساعات✨🎶 │ 🎶✨ ${minutes} دقائق✨🎶 │ 🎶✨ ${seconds} ثوان✨🎶 ╰────────⌾ 
╭─⌾🌍 الإحصائيات 🌍 │ 👥 إجمالي المستخدمين: ${totalUsers.length} │ 🏠 إجمالي المجموعات: ${totalGroups.length} │ 📜 إجمالي الأوامر المستخدمة: ${stats.totalCommands} ╰────────⌾ 
╭─⌾💻 النظام 💻 │ 🖥️ نظام التشغيل: ${os.type()} ${os.release()} │ 🔖 وقت تشغيل نظام التشغيل: ${(osUptime / 3600).toFixed(2)} ساعات │ ⚙️ استخدام وحدة المعالجة المركزية: ${cpuUsage.toFixed(2)}% │ 📶 السرعة: ${speed} كيلو بايت/ثانية │ 💽 التخزين: ${usedMemory}/${totalMemory} جيجابايت │ 📡 ذاكرة الوصول العشوائي: ${usedMemory}/${totalMemory} جيجابايت │ ${status} ╰────────⌾`;
       
       
       api.sendMessage(message, event.threadID);
     } catch (error) {
       console.error(error);
       api.sendMessage("An error occurred while retrieving system data.", event.threadID);
     }
   }
 };
