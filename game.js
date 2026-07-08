const banks = {
  initials: {
    name: "声母练习",
    promptLabel: "这个声母怎么读？",
    hint: "声母共 23 个，读得轻一点、短一点。",
    items: [
      { prompt: "b", answer: "爸", speak: "爸" },
      { prompt: "p", answer: "跑", speak: "跑" },
      { prompt: "m", answer: "妈", speak: "妈" },
      { prompt: "f", answer: "飞", speak: "飞" },
      { prompt: "d", answer: "大", speak: "大" },
      { prompt: "t", answer: "他", speak: "他" },
      { prompt: "n", answer: "你", speak: "你" },
      { prompt: "l", answer: "乐", speak: "乐" },
      { prompt: "g", answer: "哥", speak: "哥" },
      { prompt: "k", answer: "可", speak: "可" },
      { prompt: "h", answer: "好", speak: "好" },
      { prompt: "j", answer: "鸡", speak: "鸡" },
      { prompt: "q", answer: "七", speak: "七" },
      { prompt: "x", answer: "西", speak: "西" },
      { prompt: "zh", answer: "猪", speak: "猪" },
      { prompt: "ch", answer: "吃", speak: "吃" },
      { prompt: "sh", answer: "书", speak: "书" },
      { prompt: "r", answer: "日", speak: "日" },
      { prompt: "z", answer: "子", speak: "子" },
      { prompt: "c", answer: "草", speak: "草" },
      { prompt: "s", answer: "三", speak: "三" },
      { prompt: "y", answer: "衣", speak: "衣" },
      { prompt: "w", answer: "乌", speak: "乌" }
    ]
  },
  singleFinals: {
    name: "单韵母练习",
    promptLabel: "这个单韵母怎么读？",
    hint: "单韵母共 6 个，嘴型要打开、声音要响亮。",
    items: [
      { prompt: "a", answer: "啊", speak: "啊" },
      { prompt: "o", answer: "哦", speak: "哦" },
      { prompt: "e", answer: "饿", speak: "饿" },
      { prompt: "i", answer: "衣", speak: "衣" },
      { prompt: "u", answer: "乌", speak: "乌" },
      { prompt: "ü", answer: "鱼", speak: "鱼" }
    ]
  },
  compoundFinals: {
    name: "复韵母练习",
    promptLabel: "这个复韵母怎么读？",
    hint: "复韵母共 8 个，注意从前一个口型滑到后一个口型。",
    items: [
      { prompt: "ai", answer: "爱", speak: "爱" },
      { prompt: "ei", answer: "杯", speak: "杯" },
      { prompt: "ui", answer: "水", speak: "水" },
      { prompt: "ao", answer: "包", speak: "包" },
      { prompt: "ou", answer: "手", speak: "手" },
      { prompt: "iu", answer: "牛", speak: "牛" },
      { prompt: "ie", answer: "叶", speak: "叶" },
      { prompt: "üe", answer: "月", speak: "月" }
    ]
  },
  specialFinals: {
    name: "特殊韵母练习",
    promptLabel: "这个特殊韵母怎么读？",
    hint: "特殊韵母 1 个：er。",
    items: [
      { prompt: "er", answer: "儿", speak: "儿" }
    ]
  },
  frontNasalFinals: {
    name: "前鼻韵母练习",
    promptLabel: "这个前鼻韵母怎么读？",
    hint: "前鼻韵母共 5 个，尾音轻轻收在 n。",
    items: [
      { prompt: "an", answer: "安", speak: "安" },
      { prompt: "en", answer: "门", speak: "门" },
      { prompt: "in", answer: "因", speak: "因" },
      { prompt: "un", answer: "温", speak: "温" },
      { prompt: "ün", answer: "云", speak: "云" }
    ]
  },
  backNasalFinals: {
    name: "后鼻韵母练习",
    promptLabel: "这个后鼻韵母怎么读？",
    hint: "后鼻韵母共 4 个，尾音落在 ng。",
    items: [
      { prompt: "ang", answer: "羊", speak: "羊" },
      { prompt: "eng", answer: "风", speak: "风" },
      { prompt: "ing", answer: "鹰", speak: "鹰" },
      { prompt: "ong", answer: "红", speak: "红" }
    ]
  },
  wholeSyllables: {
    name: "整体认读音节练习",
    promptLabel: "这个整体认读音节怎么读？",
    hint: "整体认读音节共 16 个，不拼读，整体读出来。",
    items: [
      { prompt: "zhi", answer: "知", speak: "知" },
      { prompt: "chi", answer: "吃", speak: "吃" },
      { prompt: "shi", answer: "诗", speak: "诗" },
      { prompt: "ri", answer: "日", speak: "日" },
      { prompt: "zi", answer: "子", speak: "子" },
      { prompt: "ci", answer: "词", speak: "词" },
      { prompt: "si", answer: "四", speak: "四" },
      { prompt: "yi", answer: "衣", speak: "衣" },
      { prompt: "wu", answer: "乌", speak: "乌" },
      { prompt: "yu", answer: "鱼", speak: "鱼" },
      { prompt: "ye", answer: "叶", speak: "叶" },
      { prompt: "yue", answer: "月", speak: "月" },
      { prompt: "yuan", answer: "圆", speak: "圆" },
      { prompt: "yin", answer: "因", speak: "因" },
      { prompt: "yun", answer: "云", speak: "云" },
      { prompt: "ying", answer: "鹰", speak: "鹰" }
    ]
  }
};

const state = {
  mode: "initials",
  score: 0,
  streak: 0,
  stars: 0,
  round: 1,
  current: null,
  locked: false,
  flight: 0,
  used: Object.fromEntries(Object.keys(banks).map((mode) => [mode, []]))
};

const els = {
  score: document.querySelector("#score"),
  streak: document.querySelector("#streak"),
  stars: document.querySelector("#stars"),
  roundLabel: document.querySelector("#roundLabel"),
  hint: document.querySelector("#hint"),
  promptLabel: document.querySelector("#promptLabel"),
  prompt: document.querySelector("#prompt"),
  promptSub: document.querySelector("#promptSub"),
  answers: document.querySelector("#answers"),
  feedback: document.querySelector("#feedback"),
  speakButton: document.querySelector("#speakButton"),
  skipButton: document.querySelector("#skipButton"),
  resetButton: document.querySelector("#resetButton"),
  rocketWrap: document.querySelector("#rocketWrap"),
  tabs: Array.from(document.querySelectorAll(".tab"))
};

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function sample(list, count) {
  return shuffle(list).slice(0, count);
}

function getNextItem(bank) {
  const usedPrompts = state.used[state.mode];
  if (usedPrompts.length >= bank.items.length) {
    usedPrompts.length = 0;
  }

  const available = bank.items.filter((item) => !usedPrompts.includes(item.prompt));
  const next = sample(available, 1)[0];
  usedPrompts.push(next.prompt);
  return next;
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    els.feedback.textContent = "这个浏览器暂时不能朗读，可以让大人带着一起读。";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.72;
  utterance.pitch = 1.12;
  window.speechSynthesis.speak(utterance);
}

function makeQuestion() {
  const bank = banks[state.mode];
  const current = getNextItem(bank);
  const distractorPool = Object.values(banks)
    .flatMap((group) => group.items)
    .filter((item) => item.answer !== current.answer);
  const optionSource = bank.items.length >= 4 ? bank.items.filter((item) => item.answer !== current.answer) : distractorPool;
  const options = bank.fixedOptions
    ? bank.fixedOptions
    : shuffle([
        current.answer,
        ...sample(optionSource, 3).map((item) => item.answer)
      ]);

  state.current = {
    ...current,
    options: bank.fixedOptions ? bank.fixedOptions : options
  };
  state.locked = false;

  els.roundLabel.textContent = `第 ${state.round} 题`;
  els.hint.textContent = bank.hint;
  els.promptLabel.textContent = bank.promptLabel;
  els.prompt.textContent = current.prompt;
  els.promptSub.textContent = bank.name;
  els.feedback.className = "feedback";
  els.feedback.textContent = "选择正确答案，让小火箭继续飞。";

  els.answers.innerHTML = "";
  shuffle(state.current.options).forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(button, option));
    els.answers.append(button);
  });
}

function chooseAnswer(button, option) {
  if (state.locked) return;
  state.locked = true;

  const isCorrect = option === state.current.answer;
  const answerButtons = Array.from(document.querySelectorAll(".answer"));
  answerButtons.forEach((answerButton) => {
    if (answerButton.textContent === state.current.answer) {
      answerButton.classList.add("correct");
    }
  });

  if (isCorrect) {
    button.classList.add("correct");
    state.score += 10 + Math.min(state.streak, 5) * 2;
    state.streak += 1;
    if (state.streak % 3 === 0) state.stars += 1;
    moveRocket();
    els.feedback.className = "feedback good";
    els.feedback.textContent = state.streak % 3 === 0 ? "太棒啦！连对三题，得到一颗星星。" : "答对啦！读得又清楚又勇敢。";
    speak(state.current.speak);
  } else {
    button.classList.add("wrong");
    state.streak = 0;
    els.feedback.className = "feedback try";
    els.feedback.textContent = `差一点点，正确答案是「${state.current.answer}」。`;
    speak(`正确答案是 ${state.current.answer}，读作 ${state.current.speak}`);
  }

  updateStats();
  window.setTimeout(() => {
    state.round += 1;
    makeQuestion();
  }, isCorrect ? 1200 : 1900);
}

function updateStats() {
  els.score.textContent = state.score;
  els.streak.textContent = state.streak;
  els.stars.textContent = state.stars;
  els.rocketWrap.style.setProperty("--rocket-progress", `${state.flight}%`);
}

function moveRocket() {
  const totalQuestions = banks[state.mode].items.length;
  state.flight = Math.min(100, state.flight + 100 / totalQuestions);
  els.rocketWrap.classList.remove("boost");
  void els.rocketWrap.offsetWidth;
  els.rocketWrap.classList.add("boost");
}

function setMode(mode) {
  state.mode = mode;
  state.round = 1;
  state.streak = 0;
  state.flight = 0;
  state.used[mode] = [];
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  updateStats();
  makeQuestion();
}

function resetGame() {
  state.score = 0;
  state.streak = 0;
  state.stars = 0;
  state.round = 1;
  state.flight = 0;
  state.used[state.mode] = [];
  updateStats();
  makeQuestion();
}

els.tabs.forEach((tab) => {
  tab.addEventListener("click", () => setMode(tab.dataset.mode));
});

els.speakButton.addEventListener("click", () => {
  if (state.current) speak(state.current.speak);
});

els.skipButton.addEventListener("click", () => {
  state.round += 1;
  state.streak = 0;
  updateStats();
  makeQuestion();
});

els.resetButton.addEventListener("click", resetGame);

updateStats();
makeQuestion();
