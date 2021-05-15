//Adding all of my global variables from my HTML elements
var startDiv = document.getElementById(`start`);
var startButton = document.getElementById(`startButton`)
var quizDiv = document.getElementById(`quiz`)
var quizTimer = document.getElementById(`timer`)
var questionsEl = document.getElementById(`question`)
var resultsEl = document.getElementById(`result`)
var endDiv = document.getElementById(`end`)
var scoreEL = document.getElementById(`score`)
var initialsInput = document.getElementById(`initials`)
var enterScoreButton = document.getElementById(`enterScore`)
var highScoreContainer = document.getElementById(`highScoreContainer`)
var highScorePage = document.getElementById(`highScorePage`)
var highScoreInitials = document.getElementById(`highScoreInitials`)
var highScoreDiv = document.getElementById(`highScore`)
var finalButtons = document.getElementById(`finalButtons`)
var nameScore = document.getElementById(`nameScore`)

//setting the button variables

var button1 = document.getElementById(1)
var button2 = document.getElementById(2)
var button3 = document.getElementById(3)
var button4 = document.getElementById(4)

//adding my question variables

var quizQuestions = [{
    question: 'What is the bang symbol?',
    choice1: '$',
    choice2: '*',
    choice3: '!',
    choice4: '&',
    correctAnswer: 3,
  },
  {
    question: 'What symbol stands for an arrey?',
    choice1: '()',
    choice2: '{}',
    choice3: '<>',
    choice4: '%',
    correctAnswer: 1,
  },
  {
    question: 'How many objects can be inside another object?',
    choice1: 'Infinite',
    choice2: '1-5',
    choice3: '1',
    choice4: '1-50',
    correctAnswer: 1,
  },
  {
    question: 'What does || stand for?',
    choice1: 'stop',
    choice2: 'or',
    choice3: 'space',
    choice4: 'pause',
    correctAnswer: 2,
  },
  {
    question: '_____ is the process of finding errors and fixing them within a program?',
    choice1: 'Compiling',
    choice2: 'Scanning',
    choice3: 'Executing',
    choice4: 'Debugging',
    correctAnswer: 4,
  },
  ];

//setting the quiz variables

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var scoreEL = 0;
var correct;

//creating the generate quiz function that identifies all elements to create quiz. 

function generateQuizQuestion() {
  endDiv.style.display = 'none';
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = '<p>' + currentQuestion.question + '</p>'
  button1.innerHTML = currentQuestion.choice1
  button2.innerHTML = currentQuestion.choice2
  button3.innerHTML = currentQuestion.choice3
  button4.innerHTML = currentQuestion.choice4
};

//here i am starting the quiz by activatins the startQuiz button, and then fetching a questions through the generatequiz function and stating my timer interval.

startButton.addEventListener('click', startQuiz)

function startQuiz() {
  endDiv.style.display = 'none';
  startDiv.style.display = 'none';
  generateQuizQuestion();

  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = 'Time Left:' + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizDiv.style.display = 'block';
}

//now I need the check answer function. that way i can make sure the right button is being targeted for the right answer. also in theis section I am setting the timerleft element to subtract 10 seconds if the wrong answer s selected

function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;
  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    alert('Nice Job!');
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
    alert('Wrong Answer')
    timeLeft -= 10;
    document.getElementById('timer').innerHTML='00:'+sec;
    currentQuestionIndex++;
    generateQuizQuestion();
  }else {
    showScore(); 
  }
};

//next comes the score function. this fuction creates the score for the user, this is also the area where i have the user input the initials so they can add there score to the localstorage data, and alert them they must add there initials

function showScore() {
  quizDiv.style.display = 'none';
  endDiv.style.display = 'flex';
  clearInterval(timerInterval);
  initialsInput.value = '';
    return `<li class='score'>${scoreEL.name} - ${score.score}</li>`
};

enterScoreButton.addEventListener('click', function highScore() {

  if(initialsInput.value === '') {
    alert('Must Enter Initials to Submit');
    return false;
  } else {
    var saveHighScores = JSON.parse(localStorage.getItem('saveHighScores')) || [];
    var currentUser = initialsInput.value.trim();
    var currentHighScore = {
      name: currentUser, score: timeLeft
    };

    endDiv.style.display = 'none';
    highScoreContainer.style.display = 'flex';
    highScoreDiv.style.display = 'block';
    finalButtons.style.display = 'flex';
    saveHighScores.push(currentHighScore);
    localStorage.setItem('saveHighScores', JSON.stringify(saveHighScores));
    generateHighScores();
  }
});

//now it is time to generate the high scores page. this will take the information from the section above and put it all together for the highscores page.

function generateHighScores() {
  highScoreInitials.textContent = '';
  highScore.textContent = '';
  var highScores = JSON.parse(localStorage.getItem('saveHighScores')) || [];
  console.log(highScores)
  
  for (i = 0; i < highScores.length; i++) {
    highScoreInitials.innerHTML = 
    highScores.map(score => {
    return `<li class='high-score'>${score.name} - ${score.score}</li>`
}).join('')
  }
  highScoreContainer.style.display = 'flex'
};

function showHighScore() {
  startDiv.style.display = 'none';
  endDiv.style.display = 'none';
  highScoreContainer.style.display = 'flex';
  highScoreDiv.style.display = 'block';
  finalButtons.style.display = 'flex';
  generateHighScores();

};

//last i have the tryagain button and clear scores section.

function clearScore() {
  window.localStorage.clear();
  highScoreInitials.textContent = '';
  highScoreDiv.textContent = '';
};

function tryAgain() {
  highScoreContainer.style.display = 'none';
  endDiv.style.display = 'none';
  startDiv.style.display = 'flex';
  timeLeft = 60;
  score = 0;
  currentQuestionIndex = 0;
};

