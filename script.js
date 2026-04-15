const content = document.getElementById("content");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

let step = 0;
let answers = [];

const steps = [
  {
    title: "Q1｜【情緒溫度偵測】",
    text: `如果靈魂也有體感溫度，現在的你更像哪一種？`,
    options: [
      `慢慢升起的熱氣。<br>像冷天裡坐在暖爐邊，聽著火苗噼啪作響。<br>有一點安心、有一點放鬆，<br>但更多的是那種「明天好像會發生什麼好事」的期待。`,
      `公路上的風，望著蔚藍的天空和無止境的道路，<br>陽光透過車窗灑進來，你最愛的歌剛好播到副歌。<br>你忍不住想笑，因為你知道：接下來一定還有更瘋的旅程。`,
      `剛剛好的恆溫。<br>濃郁、滑順、很安心。<br>像被某個人抱住的瞬間，你不用說話，也能感受到的安心。`,
      `城市霓虹的微光。<br>帶一點復古、一點精緻，還有一點點微醺。<br>像特別打扮出門約會的夜晚，<br>連呼吸都覺得自己變得很有魅力。`
    ],
    transition: "“溫度已記錄...你正在靠近某段記憶”"
  },
  {
    title: "Q2｜【大地圖隨機事件觸發】",
    text: `如果今晚是一張大地圖，你最想按下哪個「事件點」？`,
    options: [
      `回到初識的那個瞬間。<br>還不算熟，但卻莫名不尷尬。<br>兩個人都假裝很淡定，卻又期待接下來的劇情。`,
      `坐在一台老舊皮卡上，窗戶全開。<br>風大到頭髮亂成一團，音樂大聲到聽不見世界。<br>你轉頭看對方的時候突然覺得：<br>啊…我好像正在談戀愛。`,
      `閉上眼睛，靠直覺走進某個熟悉的地方。<br>不用看也知道會發生什麼。<br>像回家、像被理解，<br>因為你知道對方就在等你。`,
      `穿上認真準備的衣服，走進熟悉城市裡最精緻的角落。<br>不是為了炫耀，<br>只是想偷偷告訴對方：<br>我們很日常，但我們也可以很浪漫。`
    ],
    transition: "事件已觸發。主線劇情開始載入中…"
  },
  {
    title: "Q3｜【道具欄解析】",
    text: `你的背包裡出現四個關鍵道具。<br>你直覺想拿起哪一個？`,
    options: [
      `【火種】<br>一點燃，就會出現炭火的聲音與香氣。 那是故事開始的傍晚<br>你不確定那時候算不算心動， 但你知道這天以後就不一樣了。`,
      `【指南針】<br>指針不指北，指向一條跨越半個地球的公路<br>沿途有期待、有夜色、有被觸及到的感動<br>你以為你記得的是風景，其實你記得的是，我們當時的笑聲。`,
      `【鑰匙】<br>這把鑰匙很普通，甚至有點舊<br>但你一握住它，就像握住某種熟悉的安心感。`,
      `【復古留聲機】<br>唱針落下時，播放一首屬於兩人的情歌。<br>像夜晚的城市、像成熟的擁抱、像日常被偷偷升級。<br>你會忍不住想說：<br>「今天好像值得被好好對待。」`
    ],
    transition: "道具已綁定，正在選擇結局....."
  },
  {
    title: "Q4｜【最終結局台詞】",
    text: `如果今晚是一部戀愛電影，你最喜歡螢幕上出現哪句台詞？`,
    options: [
      `「原來故事從這裡開始，就已經偷偷決定要走到現在」`,
      `「那是我們這輩子做過最瘋狂的事之一，但也可能是最甜的一次」`,
      `「繞了世界一圈，才發現我愛你一直藏在你看著我的眼神裡」`,
      `平凡的生活 就是我們屬於的浪漫`
    ],
    transition: "記憶提取完成，即將解鎖<br>目的地已解鎖——但系統不會直接公布"
  }
];

function renderStep() {
  nextBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");

  const current = steps[step];

  let html = `
    <div class="question-title">${current.title}</div>
    <p>${current.text}</p>
  `;

  current.options.forEach((opt, idx) => {
    const letter = ["A", "B", "C", "D"][idx];
    html += `
      <div class="option" onclick="selectAnswer('${letter}')">
        <strong>${letter}.</strong> <span>${opt}</span>
      </div>
    `;
  });

  content.innerHTML = html;
}

window.selectAnswer = function(letter) {
  answers.push(letter);

  const transition = steps[step].transition;

  content.innerHTML = `
    <div class="system-line">${transition}</div>
  `;

  nextBtn.classList.remove("hidden");

  if (step === steps.length - 1) {
    nextBtn.textContent = "查看結果";
  } else {
    nextBtn.textContent = "下一題";
  }
};

function calculateResult() {
  const count = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(a => count[a]++);

  let maxLetter = "A";
  for (let key in count) {
    if (count[key] > count[maxLetter]) {
      maxLetter = key;
    }
  }

  const resultMap = {
    A: "【重溫那份還沒被定義前的悸動】",
    B: "【把那段瘋狂的回憶重新裝進這座城市裡】",
    C: "【溫柔且繞道而行的依戀】",
    D: "【老派浪漫的新演繹】"
  };

  return {
    letter: maxLetter,
    text: resultMap[maxLetter]
  };
}

function showResult() {
  const result = calculateResult();

  content.innerHTML = `
    <div class="question-title">系統解析：今晚解鎖的「秘密座標」</div>
    <p>${result.text}</p>

    <div class="system-line">
      <strong>你的結果：${result.letter}</strong>
    </div>
  `;

  nextBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  if (step === steps.length - 1) {
    showResult();
  } else {
    step++;
    renderStep();
  }
});

restartBtn.addEventListener("click", () => {
  step = 0;
  answers = [];
  renderStep();
});

renderStep();