
var startButton = document.getElementById('start');
var quizQuestions = document.getElementById('quiz-questions');
var quizOptions = document.getElementById('quiz-options');
var timer = document.getElementById('counter');
var timerInterval = null;
var questions = [
    {
        question: "What is CSS?",
        answers: [
            {text: "A disease", correct: "false"},
            {text: "A way to style your HTML", correct: "true"},
            {text: "A form of government", correct: "false"},
            {text: "Python", correct: "false"}

        ]
    },
    {
        question: "Javascript is _____",
        answers: [
            {text: "A programming language", correct: "true"},
            {text: "A kind of coffee", correct: "false"},
            {text: "A script for a movie about a coffee shop", correct: "false"},
            {text: "Python", correct: "false"}
        ] 
    },
    {
        question: "Jquery is ______",
        answers: [
            {text: "A programming language", correct: "false"},
            {text: "The last name of the man who invented the computer", correct: "false"},
            {text: "A famous diner in Montana", correct: "false"},
            {text: "A javascript library", correct: "true"}
        ] 
    },
    {
        question: "Who invented JavaScript?",
        answers: [
            {text: "Guido van Rossum", correct: "false"},
            {text: "Mark Zuckerberg", correct: "false"},
            {text: "Brendan Eich", correct: "true"},
            {text: "Colonol Sanders", correct: "false"}
        ] 
    }
];

function startTimer(){
    var secondsLeft = 5;
    clearInterval(timerInterval); 
    timerInterval = null;
    var timerInterval = setInterval(function(){
     secondsLeft--;
     timer.textContent = secondsLeft + " Seconds Remaining";
 
     if(secondsLeft === 0){
        clearInterval(timerInterval);
        restartGame();
     }
 
    },1000);
};

var questionIndex = 0;
var score = 0;

function displayQuestion(){
    var currentQuestion = questions[questionIndex];
    quizQuestions.innerHTML = currentQuestion.question;
    quizOptions.innerHTML = '';
    currentQuestion.answers.forEach(function(answer){
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        button.setAttribute('data-correct', answer.correct);
        button.addEventListener('click', answerSelection);
        quizOptions.appendChild(button);
    });
};

function answerSelection(event){
    var answerChoice = event.target;
    if(answerChoice.dataset.correct === "true"){
        score++;
    }
    nextQuestion();
};

function nextQuestion(){
    questionIndex++;
    if(questionIndex < questions.length){
        quizOptions.innerHTML = '';
        displayQuestion();
    }else{
        endGame();
    }
}
var highScores = [];

function endGame(){
    clearInterval(timerInterval);
    timerInterval = null;
    timer.textContent = '';
    alert("You Scored: " + score + " out of 4");
    userIntitials = prompt("Enter Your initials");

    var userScore = {
        initials: userIntitials,
        score: score
    };

    highScores.push(userScore);
    localStorage.setItem('highScores', JSON.stringify(highScores))
    alert("high Scores:\n" + getHighScoresText());
    restartGame();
};

function getHighScoresText() {
    var scoresText = "";
    for (var i = 0; i < highScores.length; i++) {
      scoresText += highScores[i].initials + ": " + highScores[i].score + "\n";
    }
    return scoresText; 
};

function restartGame(){
    questionIndex = 0;
    score = 0;
    timer.textContent = '';
    quizOptions.innerHTML = '';
    startButton.style.display = 'inline-block';
    init();
};

function init(){
    startButton.style.display ='inline-block';
    timer.textContent = '';
    startButton.addEventListener('click', function(){
        if (startButton) {
            startButton.style.display = 'none';
            displayQuestion();
            startTimer();
        }
    });
}

init();
