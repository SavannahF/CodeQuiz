// QUESTION Set
const questions = [
  {
    //   "First"
    question: "Which ones of these is NOT a falsy value?",
    choices: ["a. NaN", "b. ' '", "c. 0", "d. 1"],
    answer: "d. 1",
  },
  {
    //   "Second"
    question:
      "Which tag is used at the end of the HTML <body> to link the JavaScript file?",
    choices: ["a. <link>", "b. <script>", "c. <a>", "d. <js>"],
    answer: "b. <script>",
  },
  {
    //   "Third"
    question:
      "Event ________ are functions that wait for an event (ie. interactions, resizing, scrolling, etc) to occur before executing.",
    choices: ["a. occurrances", "b. booleans", "c. listeners", "d. strings"],
    answer: "c. listeners",
  },
  {
    //   "Fourth"
    question: "Java : JavaScript :: Car : _______",
    choices: ["a. Mocha", "b. Carpet", "c. function", "d. AutoMobile"],
    answer: "b. Carpet",
  },
  {
    //   "Fifth"
    question:
      "Which is these statements, given by w3schools.com, is more a matter of opinion?",
    choices: [
      "a. JavaScript is the world's most popular programming language.",
      "b. JavaScript is the programming language of the Web.",
      "c. JavaScript is easy to learn.",
      "d. This tutorial will teach you JavaScript from basic to advanced.",
    ],
    answer: "c. JavaScript is easy to learn.",
  },
];

// All the references for all the Elements
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAns = 0;
var questionIndex = 0;

/**
 * FUNCTIONS
 */

// TIMER COUNTDOWN UPON START
var totalTime = 121;
function newQuiz() {
  questionIndex = 0;
  totalTime = 120;
  timeLeft.textContent = totalTime;
  initialInput.textContent = "";

  startDiv.style.display = "none";
  questionDiv.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

  var startTimer = setInterval(function () {
    totalTime--;
    timeLeft.textContent = totalTime;
    if (totalTime <= 0) {
      clearInterval(startTimer);
      if (questionIndex < questions.length - 1) {
        gameOver();
      }
    }
  }, 1000);

  showQuiz();
}

// UP NEXT, QUESTION SET
function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choiceA.textContent = questions[questionIndex].choices[0];
  choiceB.textContent = questions[questionIndex].choices[1];
  choiceC.textContent = questions[questionIndex].choices[2];
  choiceD.textContent = questions[questionIndex].choices[3];
}

// DISPLAY CORRECT OR WRONG w/ CORRECTION
function checkAnswer(answer) {
  var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";

  if (
    questions[questionIndex].answer === questions[questionIndex].choices[answer]
  ) {
    // CORRECT? ADD 1 TO SCORE
    correctAns++;
    // console.log(correctAns);
    answerCheck.textContent = "Correct!";
  } else {
    // WRONG? 10 SECONDS FROM TIMER
    totalTime -= 10;
    timeLeft.textContent = totalTime;
    answerCheck.textContent =
      "Wrong! The correct answer is " + questions[questionIndex].answer;
  }

  questionIndex++;
  // REPEAT FOR ALL IN QUESTION SET, THEN...
  if (questionIndex < questions.length) {
    nextQuestion();
  } else {
    //GAME OVER AT END
    gameOver();
  }
}

function chooseA() {
  checkAnswer(0);
}

function chooseB() {
  checkAnswer(1);
}

function chooseC() {
  checkAnswer(2);
}

function chooseD() {
  checkAnswer(3);
}

// LOST OR COMPLETE = GAME OVER!
function gameOver() {
  summary.style.display = "block";
  questionDiv.style.display = "none";
  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  // show final score
  finalScore.textContent = correctAns;
}

// enter initial and store highscore in local storage
function storeHighScores(event) {
  event.preventDefault();

  // stop function is initial is blank
  if (initialInput.value === "") {
    alert("Please enter three letters!");
    return;
  }

  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";

  // store scores into local storage
  var savedHighScores = localStorage.getItem("high scores");
  var scoresArray;

  if (savedHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(savedHighScores);
  }

  var userScore = {
    initials: initialInput.value,
    score: finalScore.textContent,
  };

  console.log(userScore);
  scoresArray.push(userScore);

  // STRINGIFY FOR STORAGE
  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("high scores", scoresArrayString);

  showHighScores();
}

// FUNCTION showHighScores
var i = 0;
function showHighScores() {
  startDiv.style.display = "none";
  timer.style.display = "none";
  questionDiv.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";

  var savedHighScores = localStorage.getItem("high scores");

  // Already have High Scores saved?
  if (savedHighScores === null) {
    return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  for (; i < storedHighScores.length; i++) {
    var eachNewHighScore = document.createElement("p");
    eachNewHighScore.innerHTML =
      storedHighScores[i].initials + ": " + storedHighScores[i].score;
    listOfHighScores.appendChild(eachNewHighScore);
  }
}

/*
 EVENT LISTENERS
 */

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function (event) {
  storeHighScores(event);
});

// HIGH SCORES view Button
viewHighScore.addEventListener("click", function (event) {
  showHighScores(event);
});

// GO BACK Button
goBackBtn.addEventListener("click", function () {
  startDiv.style.display = "block";
  highScoreSection.style.display = "none";
});

// CLEAR High Scores Button
clearHighScoreBtn.addEventListener("click", function () {
  window.localStorage.removeItem("high scores");
  listOfHighScores.innerHTML = "Clean Slate!";
  listOfHighScores.setAttribute(
    "style",
    "font-family: 'Noto Sans JP', sans-serif; font-style: italic;"
  );
});
