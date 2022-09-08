//GLOBAL VARS
var timerCount;
var questionEl = document.querySelector('.question');
var answerList = document.querySelector('.answers');
var timerEl = document.querySelector('.timer');
var startButton = document.querySelector('.start-button');
var answerStatus = document.querySelector('.answer-notification');
var i = 0;

//Vars for Highscores
var score = 0;
var highScoreBox = document.querySelector('.highscore-box');
var retakeButton = document.querySelector('.retake');
var submitHighScore = document.querySelector('#submit');
var nameInput = document.querySelector('#name');
var confirmedSub = document.querySelector('#confirmed')
var userScores = JSON.parse(localStorage.getItem('user')) || []; //Sets an array of scores and user names when submitted

//Questions array 
var questionsArray = 
    [
        {
        question: "What is not a JavaScript data type?",
        choices: ["Number", "Boolean", "Phrase", "String"],
        answer: "Phrase"
        },
        
        {
        question: "Which of the following options is used to identify stricktly equal?",
        choices: ["===", "==", "=s=", "!=="],
        answer: "==="
        },

        {
        question: "What tag would you use to link your JavaScript document to your HTML?",
        choices: ["<link>", "<body>", "<html>", "<script>"],
        answer: "<script>" 
        },
        
        {
        question: "Which of the following are popup options in JavaScript",
        choices: ["Prompt", "Alert", "Confirm", "All of the above"],
        answer: "All of the above" 
        },

        {
        question: "Which of the following is the proper syntax to call a function named: function?",
        choices: ["function.call", "function()", "function[]", "All of the above are ways to call a function"],
        answer: "function()"
        },

        {
        question: "What is the prefered case in JavaScript called?",
        choices: ["Camel case", "Brief case", "Sentence case", "Upper case"],
        answer: "Camel case"
        },
    ];

//Timer function
function startTimer () {
    var timeInterval = setInterval(function() {
        //If timer runs to 0
        if (timerCount === 0) {
            clearInterval(timeInterval)
            console.log ('time expired')
            endGame()
            answerStatus.textContent = 'Timer expired';
        } 

        //Timer counts down & stops at 0
        if (timerCount >= 0) {
            timerEl.textContent = timerCount + ' seconds left';
            timerCount--;
        } else {
        clearInterval(timeInterval)
        }
    }, 1000);
}

//QUIZ PATH

//Opening of the page
function init() {
    timerCount = 60; 
    timerEl.textContent = timerCount + ' seconds left'
    startButton.addEventListener('click', startQuiz)
    highScoreBox.style.display = 'none'
}
init()

//Quiz function that will start when 'start button' is clicked
function startQuiz() {
    questionEl.textContent ='' //Removes welcome copy
    startButton.style.display = 'none' //Removes start button
    highScoreBox.style.display = 'none' //Hides highscore form box
    startTimer() //Starts timer function
    quizQs(questionsArray) //Causes the quiz questions and answer options to populate
    
    //Function that fires the quiz questions & answer options
    function quizQs() {
        //This sets what the question will be and renders them
        var question = questionsArray[i].question
        questionEl.textContent = question

        //This sets what the answer options will be and renders them
        var choices = questionsArray[i].choices
        for (var options in choices) {
            //Sets up a new li for each of the "options" in the choices section of the questionArray
            let newChoice = document.createElement('li')

            //Publishes each option as text in the li, gives it a value and appends the child to the ul
            newChoice.textContent = choices[options]
            answerList.appendChild(newChoice)
            newChoice.setAttribute('value', choices[options])

            //Triggers the compare fuction when an answer is clicked
            newChoice.addEventListener('click', compare)
        }
    }

//Function to compare clicked answers + their resolutions
    function compare(event) {
        //Scenario that triggers end of quiz
        if (i === questionsArray.length - 1) {
            if (questionsArray[i].answer == event.target.textContent) {
                score++;
                answerStatus.textContent = 'You got the last question right!'
            } else if (questionsArray[i].answer != event.target.textContent) {
                timerCount -= 10;
                answerStatus.textContent = 'You got the last question wrong!'
            }
            //Clears prevous question text, removes timer and adds a finished message
            timerEl.style.display = 'none';
            timerCount='';
            answerList.textContent ='';
            questionEl.textContent ='';
            questionEl.textContent = 'You finished the quiz! Click the button below to see your final score and log it so you can see your scores in the highscore page!';

            //Adds back in button and labels it for seeing final score
            startButton.style.display = ''
            startButton.textContent = 'See Score'
            startButton.addEventListener('click', endGame)

        //Scenarios that trigger while quiz is active
        } else if (i < questionsArray.length) { 
            if (questionsArray[i].answer == event.target.textContent) {
                console.log('You did it!');
                score++;
                answerStatus.textContent = 'You got the last question right!'
            } else if (questionsArray[i].answer != event.target.textContent) {
                console.log('You got it wrong');
                timerCount -= 10;
                answerStatus.textContent = 'You got the last question wrong!'
            }
            answerList.textContent =''; //Removes answer choice copy between questions
            i++;
            quizQs()
        }

    }

}

//Function that triggers the end of the the quiz and allows for users to log scores
function endGame() {
    //Removes all previous copy and replaces it with the new copy and final score.
    answerList.textContent ='';
    questionEl.textContent ='';
    answerStatus.textContent = '';
    questionEl.textContent = 'Your final score is: ' + score + '/6!';
    highScoreIntake()

}

//Renders a form for the user to add their initials
function highScoreIntake() {
    highScoreBox.style.display = '' 

    //Fuction that submits highscore and user name 
    submitHighScore.addEventListener('click', function(submit) {
        submit.preventDefault();

        var user = {
            userName: nameInput.value,
            userScore: score
        }

        userScores.push(user);
        userScores.sort( (a,b) => b.user - a.user)

        confirmedSub.textContent = "Your score has been logged!"
        localStorage.setItem('user', JSON.stringify(userScores));
    })
    

    //Button to retake quiz
    retakeButton.addEventListener('click', retake)//Want this to reload the page so the user can take it again. 
}

//Function to retake quiz
function retake() {
    startQuiz()
    timerCount = 60
}
