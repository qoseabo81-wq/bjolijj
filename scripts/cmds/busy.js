const handleReply = [];

module.exports.config = {
  name: "اعلام",
  aliases: ["دول"],
  permissions: [0],
  description: "لعبة احزر العلم",
  usage: "",
  cooldown: 0,
  credits: "عمر",
  commandCategory: "العاب"
};

const questions = [
  { image: "https://i.pinimg.com/originals/6f/a0/39/6fa0398e640e5545d94106c2c42d2ff8.jpg", answer: "العراق" },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/256px-Flag_of_Brazil.svg.png", answer: "البرازيل" },
  { image: "https://i.pinimg.com/originals/66/38/a1/6638a104725f4fc592c1b832644182cc.jpg", answer: "فلسطين" },
  { image: "https://i.pinimg.com/originals/f9/47/0e/f9470ea33ff6fbf794b0b8bb00a5ccb4.jpg", answer: "المغرب" },
  { image: "https://i.pinimg.com/originals/2d/a2/6e/2da26e58efd5f32fe2e33b9654907ab5.gif", answer: "الصومال" }
];

module.exports.run = async function({ api, event, Currencies }) {
  try {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const correctAnswer = randomQuestion.answer.toLowerCase();

    const sentMessage = await api.sendMessage(
      { body: "ما اسم علم هذه الدولة؟", attachment: [{ type: "image", url: randomQuestion.image }] },
      event.threadID
    );

    handleReply.push({
      messageID: sentMessage.messageID,
      correctAnswer,
      answered: false
    });

  } catch (err) {
    console.error(err);
    api.sendMessage("❌ حدث خطأ، حاول مرة أخرى.", event.threadID);
  }
};

module.exports.handleReply = async function({ api, event, Currencies }) {
  try {
    const userAnswer = event.body.trim().toLowerCase();
    const current = handleReply.find(x => !x.answered);
    if (!current) return;

    if (userAnswer === current.correctAnswer) {
      await Currencies.increaseMoney(event.senderID, 50);
      api.sendMessage(`✅ تهانينا! إجابتك صحيحة، لقد حصلت على 50 دولار`, event.threadID);
      current.answered = true;
    } else {
      api.sendMessage("❌ إجابة خاطئة، حاول مرة أخرى", event.threadID);
    }
  } catch (err) {
    console.error(err);
    api.sendMessage("❌ حدث خطأ أثناء التحقق من الإجابة.", event.threadID);
  }
};
