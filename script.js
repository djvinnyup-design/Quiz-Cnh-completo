const startBtn = document.getElementById("start-btn");
const userForm = document.getElementById("user-form");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const levelStatusEl = document.getElementById("level-status");
const rankingEl = document.getElementById("ranking");

let username = "";
let currentQuestion = 0;
let score = 0;

startBtn.addEventListener("click", () => {
  const input = document.getElementById("username");
  if (input.value.trim() === "") {
    alert("Por favor, digite seu nome para começar!");
    return;
  }
  username = input.value.trim();
  userForm.classList.add("hidden");
  quizEl.classList.remove("hidden");
  showQuestion();
});

const questions = [
  {
    question: "Onde é admitida e queimada a mistura ar + combustível?",
    answers: ["No carburador", "Na câmara de combustão", "No filtro de ar", "No coletor de escape"],
    correct: 1,
    explanation: "A mistura é admitida pelo sistema de alimentação, mas queimada apenas na CÂMARA DE COMBUSTÃO."
  },
  {
    question: "A temperatura normal de funcionamento de um motor é de:",
    answers: ["40º a 60º C", "90º a 100º C", "120º C", "200º C"],
    correct: 1,
    explanation: "Motores trabalham em média entre 90ºC e 100ºC."
  },
  {
    question: "Desgaste anormal do pneu pode indicar:",
    answers: ["Desalinhamento", "Desbalanceamento", "Calibragem incorreta", "Todas as alternativas estão corretas"],
    correct: 3,
    explanation: "Todos os fatores listados podem causar desgaste anormal."
  },
  {
    question: "É o suporte de todas as peças do veículo:",
    answers: ["Chassi", "Motor", "Carroceria", "Suspensão"],
    correct: 0,
    explanation: "O chassi é a estrutura que sustenta todas as peças."
  },
  {
    question: "No motor a gasolina, a combustão é provocada:",
    answers: ["Pela compressão", "Pela vela de ignição", "Pelo carburador", "Pelo pistão"],
    correct: 1,
    explanation: "Motores a gasolina utilizam vela de ignição para provocar a combustão."
  },
  {
    question: "Qual a função da vela de ignição?",
    answers: ["Comprimir a mistura", "Gerar a centelha", "Resfriar o motor", "Lubrificar as peças"],
    correct: 1,
    explanation: "A vela gera a centelha que inicia a combustão."
  },
  {
    question: "Marque qual peça NÃO faz parte do sistema de alimentação:",
    answers: ["Carburador", "Bomba de combustível", "Filtro de ar", "Radiador"],
    correct: 3,
    explanation: "O radiador faz parte do sistema de arrefecimento."
  },
  {
    question: "Arfagem é um defeito comum no sistema:",
    answers: ["De arrefecimento", "De embreagem", "De freios", "De direção"],
    correct: 2,
    explanation: "Arfagem é a entrada de ar no sistema de freios."
  },
  {
    question: "Qual alternativa está ERRADA?",
    answers: [
      "A bateria é um gerador de energia elétrica.",
      "A bobina transforma baixa tensão em alta tensão.",
      "A vela provoca a combustão.",
      "O alternador recarrega a bateria."
    ],
    correct: 2,
    explanation: "Quem provoca a combustão é a centelha no interior da câmara, não a vela em si."
  },
  {
    question: "Qual equipamento absorve os vapores de combustível do tanque?",
    answers: ["Canister", "Radiador", "Carburador", "Bomba de combustível"],
    correct: 0,
    explanation: "O canister armazena vapores e os redireciona para o motor."
  },
  {
    question: "Principais peças fixas de um motor:",
    answers: ["Cabeçote, bloco e cárter", "Pistão e biela", "Virabrequim e válvulas", "Carburador e bomba"],
    correct: 0,
    explanation: "Cabeçote, bloco e cárter são peças fixas."
  },
  {
    question: "Cuidados para evitar superaquecimento no motor:",
    answers: ["Verificar água e aditivo", "Trocar óleo", "Ajustar freios", "Usar combustível premium"],
    correct: 0,
    explanation: "O principal cuidado é manter o sistema de arrefecimento em ordem."
  },
  {
    question: "Qual peça serve como reservatório de óleo lubrificante?",
    answers: ["Cárter", "Cabeçote", "Radiador", "Filtro de ar"],
    correct: 0,
    explanation: "O cárter armazena o óleo lubrificante."
  },
  {
    question: "Parte mais pesada de um motor:",
    answers: ["Bloco do motor", "Cabeçote", "Cárter", "Virabrequim"],
    correct: 0,
    explanation: "O bloco do motor é a peça mais pesada."
  },
  {
    question: "Consequências de dirigir com pneus descalibrados:",
    answers: ["Aumento de consumo", "Desgaste irregular", "Risco de acidente", "Todas as alternativas"],
    correct: 3,
    explanation: "Todas as consequências podem ocorrer."
  },
  {
    question: "Sistemas de arrefecimento podem ser:",
    answers: ["A ar ou a água", "A óleo ou elétrico", "Manual ou automático", "A gasolina ou diesel"],
    correct: 0,
    explanation: "Os principais são a ar e a água."
  },
  {
    question: "Principal peça do sistema de arrefecimento:",
    answers: ["Radiador", "Bomba de óleo", "Vela", "Carburador"],
    correct: 0,
    explanation: "O radiador é essencial para dissipar calor."
  },
  {
    question: "A mecânica de um veículo é dividida em sete partes. Quais são?",
    answers: ["Motor, transmissão, suspensão, freios, direção, elétrica e carroceria", "Motor, câmbio, faróis, pneus, volante, vidros e escapamento", "Som, suspensão, motor, câmbio, pneus, bancos e portas", "Motor, freios, direção, pneus, tanque, luzes e buzina"],
    correct: 0,
    explanation: "As sete divisões básicas são motor, transmissão, suspensão, freios, direção, elétrica e carroceria."
  },
  {
    question: "A energia mecânica que impulsiona o veículo é produzida pelo:",
    answers: ["Motor", "Radiador", "Bateria", "Carburador"],
    correct: 0,
    explanation: "É o motor que converte energia química em mecânica."
  },
  {
    question: "O que significa OTTO?",
    answers: ["Ciclo de combustão a gasolina", "Sistema de freios", "Transmissão automática", "Suspensão dianteira"],
    correct: 0,
    explanation: "O Ciclo OTTO é o ciclo termodinâmico de motores a gasolina."
  },
  {
    question: "Qual componente realiza a mistura ar + combustível?",
    answers: ["Carburador ou injeção eletrônica", "Radiador", "Pistão", "Vela"],
    correct: 0,
    explanation: "A mistura é feita pelo carburador (motores antigos) ou injeção eletrônica (atuais)."
  },
  {
    question: "Qual tipo de freio proporciona maior poder de frenagem e evita travamento das rodas?",
    answers: ["Freio a tambor", "Freio a disco", "Freio ABS", "Freio hidráulico"],
    correct: 2,
    explanation: "O sistema ABS evita travamento e aumenta a segurança."
  },
  {
    question: "Qual NÃO faz parte do sistema de lubrificação?",
    answers: ["Filtro de óleo", "Bomba de óleo", "Cárter", "Vela"],
    correct: 3,
    explanation: "A vela faz parte do sistema de ignição."
  },
  {
    question: "Qual alternativa NÃO corresponde a um sistema anexo ao motor?",
    answers: ["Arrefecimento", "Lubrificação", "Alimentação", "Volante do motorista"],
    correct: 3,
    explanation: "O volante é parte da direção, não do motor."
  },
  {
    question: "Lubrificante pode ser:",
    answers: ["Mineral, sintético ou semissintético", "Gasolina, etanol e diesel", "Água ou óleo de cozinha", "Graxa apenas"],
    correct: 0,
    explanation: "Classificações comuns: mineral, sintético e semissintético."
  },
  {
    question: "Onde fica localizado o comando do afogador de um automóvel?",
    answers: ["No painel", "No motor", "No pedal de freio", "No câmbio"],
    correct: 0,
    explanation: "O comando do afogador geralmente fica no painel."
  },
  {
    question: "Qual NÃO corresponde a uma peça móvel do motor?",
    answers: ["Pistão", "Biela", "Virabrequim", "Cabeçote"],
    correct: 3,
    explanation: "Cabeçote é uma peça fixa."
  },
  {
    question: "Na lubrificação interna do motor deve ser usado lubrificante do tipo:",
    answers: ["Óleo específico automotivo", "Água", "Graxa industrial", "Óleo vegetal"],
    correct: 0,
    explanation: "Somente óleo lubrificante automotivo adequado."
  },
  {
    question: "Motores a diesel dispensam:",
    answers: ["Vela de ignição", "Bomba injetora", "Turbina", "Filtro de ar"],
    correct: 0,
    explanation: "A combustão no diesel ocorre por compressão, sem vela."
  },
  {
    question: "Qual sistema absorve impactos provocados por irregularidades na pista?",
    answers: ["Direção", "Suspensão", "Freios", "Transmissão"],
    correct: 1,
    explanation: "A suspensão garante conforto e segurança."
  }
];

function showQuestion() {
  let q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(index);
    answersEl.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
}

function checkAnswer(index) {
  let q = questions[currentQuestion];
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((btn, i) => {
    if (i === q.correct) {
      btn.style.background = "green";
    } else if (i === index) {
      btn.style.background = "red";
    }
    btn.disabled = true;
  });

  if (index === q.correct) {
    score++;
  }

  const exp = document.createElement("p");
  exp.textContent = "Explicação: " + q.explanation;
  answersEl.appendChild(exp);

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
});

function finishQuiz() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");

  let percent = Math.round((score / questions.length) * 100);
  scoreEl.textContent = `${username}, você acertou ${score} de ${questions.length} (${percent}%).`;

  if (percent >= 70) {
    levelStatusEl.textContent = "✅ Parabéns! Você passou para o próximo nível!";
  } else {
    levelStatusEl.textContent = "❌ Você não atingiu 70%. Tente novamente!";
  }

  saveRanking(username, percent);
  showRanking();
}

function saveRanking(name, percent) {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name, percent });
  ranking.sort((a, b) => b.percent - a.percent);
  localStorage.setItem("ranking", JSON.stringify(ranking));
}

function showRanking() {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  rankingEl.innerHTML = "";
  ranking.slice(0, 10).forEach((r, i) => {
    let li = document.createElement("li");
    li.textContent = `${i + 1}. ${r.name} - ${r.percent}%`;
    rankingEl.appendChild(li);
  });
}
// =====================
// Sistema de recompensa por acerto
// =====================
function rewardAnswer(answer) {
  if(answer.correct) {
    // Adiciona pontos
    score += 10;

    // Feedback visual extra
    feedbackEl.innerHTML += `<p>🎉 Você ganhou 10 pontos!</p>`;

    // Barra de progresso muda de cor
    progressBar.style.backgroundColor = '#4CAF50';
  } else {
    // Cor vermelha para erro
    progressBar.style.backgroundColor = '#f44336';
  }
}

// =====================
// Atualizar função selectAnswer para chamar rewardAnswer
// =====================
const originalSelectAnswer = selectAnswer;
selectAnswer = function(answer) {
  originalSelectAnswer(answer); // mantém seu feedback original
  rewardAnswer(answer);         // adiciona pontuação e visual
};

// =====================
// Verifica passagem de nível ao final do quiz
// =====================
function checkLevelProgress() {
  const totalQuestions = questions.length;
  const percent = (score / (totalQuestions * 10)) * 100; // cada pergunta vale 10 pontos

  if(currentQuestionIndex >= totalQuestions) {
    if(percent >= 70) {
      feedbackEl.innerHTML += `<p>✅ Parabéns! Você atingiu ${percent.toFixed(0)}% e avançou de nível!</p>`;
    } else {
      feedbackEl.innerHTML += `<p>⚠️ Você atingiu apenas ${percent.toFixed(0)}%. Tente novamente para passar de nível.</p>`;
    }
  }
}

// =====================
// Atualiza nextBtn para chamar checkLevelProgress
// =====================
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  updateProgressBar();

  if(currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
    checkLevelProgress(); // chama recompensa de nível
  }
});
