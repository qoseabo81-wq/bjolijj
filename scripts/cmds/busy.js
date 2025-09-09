module.exports = {
  config: {
    name: "اعلام",
    version: "1.0",
    author: "عمر",
    countDown: 5,
    role: 0,
    description: { en: "لعبة احزر العلم" },
    category: "games"
  },

  onStart: async function ({ api, event, args, Currencies }) {
    try {
      const questions = [
        { image: "https://i.pinimg.com/originals/6f/a0/39/6fa0398e640e5545d94106c2c42d2ff8.jpg", answer: "العراق" },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/256px-Flag_of_Brazil.svg.png", answer: "البرازيل" },
        { image: "https://i.pinimg.com/originals/66/38/a1/6638a104725f4fc592c1b832644182cc.jpg", answer: "فلسطين" }
      ];

      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      const correctAnswer = randomQuestion.answer.toLowerCase();

      // أرسل السؤال مع الصورة
      api.sendMessage(
        {
          body: "ما اسم علم هذه الدولة؟",
          attachment: [{ type: "image", url: randomQuestion.image }]
        },
        event.threadID,
        (err, info) => {
          if (!err) {
            // سجل السؤال للمحادثة
            global.flagsGame = global.flagsGame || {};
            global.flagsGame[event.threadID] = {
              messageID: info.messageID,
              correctAnswer,
              answered: false
            };
          } else console.error(err);
        }
      );

    } catch (error) {
      console.error(error);
      api.sendMessage("❌ حدث خطأ، حاول مرة أخرى.", event.threadID);
    }
  },

  onReply: async function ({ api, event, args, Currencies }) {
    const game = global.flagsGame?.[event.threadID];
    if (!game || game.answered) return;

    if (event.body.trim().toLowerCase() === game.correctAnswer) {
      await Currencies.increaseMoney(event.senderID, 50);
      api.sendMessage(`✅ تهانينا! إجابتك صحيحة، لقد حصلت على 50 دولار`, event.threadID);
      game.answered = true; // تمنع أي شخص آخر من الإجابة
    } else {
      api.sendMessage("❌ إجابة خاطئة، حاول مرة أخرى", event.threadID);
    }
  }
};
