const questions = [
  {
    question: "Onde é admitida e queimada a mistura ar + combustível?",
    answers: [
      { text: "Câmara de combustão", correct: true },
      { text: "Radiador", correct: false },
      { text: "Filtro de ar", correct: false },
      { text: "Pneu", correct: false }
    ]
  },
  // ...adicione todas as 30 perguntas do nível 1 aqui, no mesmo formato
];

const startBtn = document.getElementById("startQuiz");
const usernameInput = document.getElementById("username");
const quizEl = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const resultEl = document.getElementById("result");
const rankingEl = document.getElementById("ranking");
const rankingList = document.getElementById("ranking-list");

let currentQuestion = 0;
let score = 0;
let username = "";

startBtn.addEventListener("click", () => {
  if (usernameInput.value.trim() === "") return alert("Digite seu nome!");
  username = usernameInput.value.trim();
  document.querySelector(".user-input").classList.add("hidden");
  quizEl.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.innerText = q.question;
  answersEl.innerHTML = "";
  q.answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans.text;
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => selectAnswer(btn, ans.correct));
    answersEl.appendChild(btn);
  });
  nextBtn.classList.add("hidden");
  updateProgress();
}

function selectAnswer(btn, correct) {
  if(correct){
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
  }
  Array.from(answersEl.children).forEach(b => b.disabled = true);
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if(currentQuestion < questions.length){
    showQuestion();
  } else {
    showResult();
  }
});

function updateProgress() {
  const percent = ((currentQuestion)/questions.length)*100;
  progressBar.style.width = percent + "%";
}

function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `<h2>${username}, você acertou ${score} de ${questions.length} perguntas!</h2>`;
  updateRanking();
}

function updateRanking() {
  rankingEl.classList.remove("hidden");
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({name: username, score: score});
  ranking.sort((a,b) => b.score - a.score);
  localStorage.setItem("ranking", JSON.stringify(ranking));
  rankingList.innerHTML = "";
  ranking.forEach(r => {
    const li = document.createElement("li");
    li.innerText = `${r.name} - ${r.score} pontos`;
    rankingList.appendChild(li);
  });
}
