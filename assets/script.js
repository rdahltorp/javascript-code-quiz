/* Psuedo Code
- User opens the application
- User is greated wuth a few options/visuals 
---(top left) Link to the highscores page
---(top right) timer with 60 seconds on it - not counting down yet
---(center of screen) opening message reading something like:
<title> JavaScript Quiz </title> ///Maybe I put this in the center of the header?
<p>Welcome! This quiz is intened to test your base knowledge of JavaScript. When you press the strat button below, you will be asked a series of questions pretaining to JavaScript.
As you progress the timer in the top right will begin to count down. Once you make it to the end, you can enter your name/initials to save your highscore. But be careful. 
Each wrong answer decreases the time by 10 seconds, and if the timer reaches 0 before you are done, it will be game over! 
Have fun and good luck! </p> 
<button> START </button>

///WHEN START IS PRESSED
- WHen the user hits start, the quiz triggers. 
- The welcome copy gets swapped for the first question, which then has 4 options to choose from. 
- Once the user clicks one of the options the question swaps to the next and at the bottom of question a line of text triggers saying "incorrect" or "correct". If incorrect the timer decreases by 10 seconds
- User proceeds to answer all questions
*/

//Question function psuedo code
  /*function question1() {
   Goals here: 
  - change .question to be a new question
  - create 4 answers 
  - if else statement that:
  --- if (click === right answer) {
    fire question 2 function;
    create prompt that reads "last question: correct!";
  } else if (click !== correct) {
    fire question 2 function;
    create prompt that reads "last question: correct!";
    deduct 10 seconds from timer
  } else if (timer === 0) {
    Trigger end game 
    message = timer expired
  }

}  */


//Global Vars
var timerCount;
var questionEl = document.querySelector('.question');
var answerList = document.querySelector('.answers');
var timerEl = document.querySelector('.timer');
var startButton = document.querySelector('.start-button');
var answerStatus = document.querySelector('.answer-notification');
var i = 0;
var score = 0;


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
    
        //Intended to stop time when end of questions is reached, but it stops time at the last question. Not sure why or how to get it to stop when I finish the questions. 
        if (i === questionsArray.length - 1 && timerCount > 0) {
            clearInterval(timeInterval)
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
}
init()

//Quiz function that will start when 'start button' is clicked
function startQuiz() {
    questionEl.textContent ='' //Removes welcome copy
    startButton.style.display = 'none' //Removes start button
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
        //Scenario that triggers end of quiz //need to change the results here to fire a new function that loads the form.
        if (i === questionsArray.length - 1) {
            if (questionsArray[i].answer == event.target.textContent) {
                score++;
                answerStatus.textContent = 'You got the last question right!'
            } else if (questionsArray[i].answer != event.target.textContent) {
                timerCount -= 10;
                answerStatus.textContent = 'You got the last question wrong!'
            }
            //Clears prevous question text and adds a finished message
            answerList.textContent ='';
            questionEl.textContent ='';
            questionEl.textContent = 'You finished the quiz! Click the button below to see your final score and log it so you can see your scores in the highscore page!';

            //Adds back in button and labels it 
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

    //Renders a form for the user to add their initials

    //NEED A FUNCTION THAT LOGS THEIR SCORES IN THE LOCAL STORAGE
}