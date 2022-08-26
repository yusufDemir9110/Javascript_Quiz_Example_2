const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const qImg = document.getElementById("qImg");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("scoreContainer");
const userAnswersContainer = document.getElementById("userAnswers");
const userAnswers = [];

const questions = [
  {
    question: "What does HTML stands for?",
    imgSrc: "assets/images.png",
    choiceA: "Hyper Text Markup Language",
    choiceB: "Hyperlinks Text Markup List",
    choiceC: "Home Tool Make Life",
    correct: "A",
  },
  {
    question: "What does CSS stands for?",
    imgSrc: "assets/css.png",
    choiceA: "Con Save Souls",
    choiceB: "Cascading Style Sheet",
    choiceC: "Correction Styles Shit",
    correct: "B",
  },
  {
    question: "What does JS stands for?",
    imgSrc: "assets/js.png",
    choiceA: "Java Saving",
    choiceB: "Java Style",
    choiceC: "Javascript",
    correct: "C",
  },
];

const LastQuestionIndex = questions.length - 1;
let runningQuestionIndex = 0;

function questionRender() {
  let q = questions[runningQuestionIndex];
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

function progressRender() {
  for (let qIndex = 0; qIndex <= LastQuestionIndex; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}
function answerIsCorrect() {
  document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
}
function answerIsWrong() {
  document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
}

const questionTime = 10;
const gaugeWidth = 150;
let count = 0;
const gaugeProgressUnit = gaugeWidth / questionTime;

function counterRender() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = gaugeProgressUnit * count + "px";
    count++;
  } else {
    count = 0;
    answerIsWrong();
    if (runningQuestionIndex < LastQuestionIndex) {
      runningQuestionIndex++;
      questionRender();
    } else {
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

//checking answer

let score = 0;
function checkAnswer(answer) {
  if (answer == questions[runningQuestionIndex].correct) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  if (runningQuestionIndex < LastQuestionIndex) {
    count = 0;
    runningQuestionIndex++;
    questionRender();
  } else {
    clearInterval(TIMER);
    scoreRender();
  }
  userAnswers.push(answer);
  console.log(answer);
}

//start Quiz

start.addEventListener("click", startQuiz);
let TIMER;
function startQuiz() {
  start.style.display = "none";
  counterRender();
  TIMER = setInterval(counterRender, 1000);
  progressRender();
  questionRender();
  quiz.style.display = "block";
}

//score render

function scoreRender() {
  scoreContainer.style.display = "flex";
  quiz.style.display = "none";
  let scorePerCent = Math.round((100 * score) / questions.length);
  let img =
    scorePerCent >= 80
      ? "./assets/1.jpg"
      : scorePerCent >= 60
      ? "./assets/2.jpg"
      : scorePerCent >= 40
      ? "./assets/3.jpg"
      : scorePerCent >= 20
      ? "./assets/4.jpg"
      : "./assets/5.jpg";
  scoreContainer.innerHTML =
    "<img src=" + img + "><p>" + scorePerCent + "%</p>";
  console.log(userAnswers);
  userAnswersContainer.innerHTML = userAnswers.map((userAnswer) => {
    return ` ${userAnswer}`;
  });
}
