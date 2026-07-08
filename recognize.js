const initialOptions = ["b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "zh", "ch", "sh", "r", "z", "c", "s", "y", "w"];
const finalOptions = ["a", "o", "e", "i", "u", "ü", "ai", "ei", "ui", "ao", "ou", "iu", "ie", "üe", "er", "an", "en", "in", "un", "ün", "ang", "eng", "ing", "ong"];

const recognitionItems = [
  { hanzi: "播", pinyin: "bō", initial: "b", final: "o", speak: "播" },
  { hanzi: "泼", pinyin: "pō", initial: "p", final: "o", speak: "泼" },
  { hanzi: "摸", pinyin: "mō", initial: "m", final: "o", speak: "摸" },
  { hanzi: "佛", pinyin: "fó", initial: "f", final: "o", speak: "佛" },
  { hanzi: "得", pinyin: "dé", initial: "d", final: "e", speak: "得" },
  { hanzi: "特", pinyin: "tè", initial: "t", final: "e", speak: "特" },
  { hanzi: "呢", pinyin: "ne", initial: "n", final: "e", speak: "呢" },
  { hanzi: "了", pinyin: "le", initial: "l", final: "e", speak: "了" },
  { hanzi: "哥", pinyin: "gē", initial: "g", final: "e", speak: "哥" },
  { hanzi: "颗", pinyin: "kē", initial: "k", final: "e", speak: "颗" },
  { hanzi: "喝", pinyin: "hē", initial: "h", final: "e", speak: "喝" },
  { hanzi: "鸡", pinyin: "jī", initial: "j", final: "i", speak: "鸡" },
  { hanzi: "期", pinyin: "qī", initial: "q", final: "i", speak: "期" },
  { hanzi: "西", pinyin: "xī", initial: "x", final: "i", speak: "西" },
  { hanzi: "只", pinyin: "zhī", initial: "zh", final: "i", speak: "只" },
  { hanzi: "吃", pinyin: "chī", initial: "ch", final: "i", speak: "吃" },
  { hanzi: "师", pinyin: "shī", initial: "sh", final: "i", speak: "师" },
  { hanzi: "日", pinyin: "rì", initial: "r", final: "i", speak: "日" },
  { hanzi: "字", pinyin: "zì", initial: "z", final: "i", speak: "字" },
  { hanzi: "刺", pinyin: "cì", initial: "c", final: "i", speak: "刺" },
  { hanzi: "丝", pinyin: "sī", initial: "s", final: "i", speak: "丝" },
  { hanzi: "医", pinyin: "yī", initial: "y", final: "i", speak: "医" },
  { hanzi: "屋", pinyin: "wū", initial: "w", final: "u", speak: "屋" },
  { hanzi: "鱼", pinyin: "yú", initial: "y", final: "ü", speak: "鱼" },
  { hanzi: "唉", pinyin: "āi", initial: "", final: "ai", speak: "唉" },
  { hanzi: "诶", pinyin: "ēi", initial: "", final: "ei", speak: "诶" },
  { hanzi: "围", pinyin: "wéi", initial: "w", final: "ui", speak: "围" },
  { hanzi: "奥", pinyin: "ào", initial: "", final: "ao", speak: "奥" },
  { hanzi: "欧", pinyin: "ōu", initial: "", final: "ou", speak: "欧" },
  { hanzi: "油", pinyin: "yóu", initial: "y", final: "iu", speak: "油" },
  { hanzi: "椰", pinyin: "yē", initial: "y", final: "ie", speak: "椰" },
  { hanzi: "月", pinyin: "yuè", initial: "y", final: "üe", speak: "月" },
  { hanzi: "儿", pinyin: "ér", initial: "", final: "er", speak: "儿" },
  { hanzi: "安", pinyin: "ān", initial: "", final: "an", speak: "安" },
  { hanzi: "嗯", pinyin: "ēn", initial: "", final: "en", speak: "嗯" },
  { hanzi: "印", pinyin: "yìn", initial: "y", final: "in", speak: "印" },
  { hanzi: "蚊", pinyin: "wén", initial: "w", final: "un", speak: "蚊" },
  { hanzi: "云", pinyin: "yún", initial: "y", final: "ün", speak: "云" },
  { hanzi: "昂", pinyin: "áng", initial: "", final: "ang", speak: "昂" },
  { hanzi: "哼", pinyin: "hēng", initial: "h", final: "eng", speak: "哼" },
  { hanzi: "鹰", pinyin: "yīng", initial: "y", final: "ing", speak: "鹰" },
  { hanzi: "嗡", pinyin: "wēng", initial: "w", final: "ong", speak: "嗡" }
];

const state = {
  target: "both",
  score: 0,
  streak: 0,
  stars: 0,
  used: [],
  current: null,
  selectedInitial: null,
  selectedFinal: null,
  locked: false
};

const els = {
  score: document.querySelector("#score"),
  streak: document.querySelector("#streak"),
  stars: document.querySelector("#stars"),
  taskLabel: document.querySelector("#taskLabel"),
  hanziPrompt: document.querySelector("#hanziPrompt"),
  pinyinHint: document.querySelector("#pinyinHint"),
  initialGroup: document.querySelector("#initialGroup"),
  finalGroup: document.querySelector("#finalGroup"),
  initialAnswers: document.querySelector("#initialAnswers"),
  finalAnswers: document.querySelector("#finalAnswers"),
  feedback: document.querySelector("#feedback"),
  speakButton: document.querySelector("#speakButton"),
  skipButton: document.querySelector("#skipButton"),
  resetButton: document.querySelector("#resetButton"),
  tabs: Array.from(document.querySelectorAll(".tab"))
};

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function sample(list, count) {
  return shuffle(list).slice(0, count);
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    els.feedback.textContent = "这个浏览器暂时不能朗读，可以让大人带着一起读。";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.78;
  utterance.pitch = 1.08;
  window.speechSynthesis.speak(utterance);
}

function nextItem() {
  if (state.used.length >= recognitionItems.length) state.used = [];
  const available = recognitionItems.filter((item) => !state.used.includes(item.hanzi));
  const next = sample(available, 1)[0];
  state.used.push(next.hanzi);
  return next;
}

function makeOptions(correct, pool) {
  const choices = correct ? [correct] : ["无声母"];
  const normalizedPool = pool.filter((value) => value !== correct && value !== "");
  return shuffle([...choices, ...sample(normalizedPool, 3)]);
}

function renderQuestion() {
  state.current = nextItem();
  state.selectedInitial = null;
  state.selectedFinal = null;
  state.locked = false;

  const item = state.current;
  els.hanziPrompt.textContent = item.hanzi;
  els.pinyinHint.textContent = item.pinyin;
  els.feedback.className = "feedback";
  els.feedback.textContent = "看汉字，选出正确的声母和韵母。";
  els.taskLabel.textContent = state.target === "initial" ? "这个汉字的声母是什么？" : state.target === "final" ? "这个汉字的韵母是什么？" : "这个汉字的声母和韵母是什么？";
  els.initialGroup.hidden = state.target === "final";
  els.finalGroup.hidden = state.target === "initial";

  renderChoices(els.initialAnswers, makeOptions(item.initial, initialOptions), "initial");
  renderChoices(els.finalAnswers, makeOptions(item.final, finalOptions), "final");
}

function renderChoices(container, options, kind) {
  container.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer mini-answer";
    button.textContent = option;
    button.addEventListener("click", () => choose(kind, option, button));
    container.append(button);
  });
}

function choose(kind, option, button) {
  if (state.locked) return;
  if (kind === "initial") state.selectedInitial = option;
  if (kind === "final") state.selectedFinal = option;
  button.parentElement.querySelectorAll(".answer").forEach((item) => item.classList.remove("selected"));
  button.classList.add("selected");

  const needsInitial = state.target !== "final";
  const needsFinal = state.target !== "initial";
  if ((needsInitial && !state.selectedInitial) || (needsFinal && !state.selectedFinal)) return;

  checkAnswer();
}

function checkAnswer() {
  const item = state.current;
  state.locked = true;
  const correctInitial = item.initial || "无声母";
  const initialOk = state.target === "final" || state.selectedInitial === correctInitial;
  const finalOk = state.target === "initial" || state.selectedFinal === item.final;
  const isCorrect = initialOk && finalOk;

  markAnswers(els.initialAnswers, correctInitial, state.selectedInitial);
  markAnswers(els.finalAnswers, item.final, state.selectedFinal);

  if (isCorrect) {
    state.score += 10 + Math.min(state.streak, 5) * 2;
    state.streak += 1;
    if (state.streak % 3 === 0) state.stars += 1;
    els.feedback.className = "feedback good";
    els.feedback.textContent = `答对啦！${item.hanzi} 的拼音是 ${item.pinyin}。`;
    speak(item.speak);
  } else {
    state.streak = 0;
    els.feedback.className = "feedback try";
    els.feedback.textContent = `${item.hanzi} 的声母是「${correctInitial}」，韵母是「${item.final}」。`;
    speak(item.speak);
  }

  updateStats();
  window.setTimeout(renderQuestion, isCorrect ? 1300 : 2300);
}

function markAnswers(container, correct, selected) {
  container.querySelectorAll(".answer").forEach((button) => {
    if (button.textContent === correct) button.classList.add("correct");
    if (button.textContent === selected && selected !== correct) button.classList.add("wrong");
    button.disabled = true;
  });
}

function updateStats() {
  els.score.textContent = state.score;
  els.streak.textContent = state.streak;
  els.stars.textContent = state.stars;
}

function setTarget(target) {
  state.target = target;
  state.used = [];
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.target === target));
  renderQuestion();
}

function resetGame() {
  state.score = 0;
  state.streak = 0;
  state.stars = 0;
  state.used = [];
  updateStats();
  renderQuestion();
}

els.tabs.forEach((tab) => tab.addEventListener("click", () => setTarget(tab.dataset.target)));
els.speakButton.addEventListener("click", () => state.current && speak(state.current.speak));
els.skipButton.addEventListener("click", renderQuestion);
els.resetButton.addEventListener("click", resetGame);

updateStats();
renderQuestion();
