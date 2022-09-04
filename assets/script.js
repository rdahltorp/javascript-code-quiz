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
var timerEl = document.querySelector('.timer')
var startButton = document.querySelector('.start-button')
var answerStatus = document.querySelector('.answer-notification')

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


//Opening of the page
function init() {
    timerCount = 60; 
    timerEl.textContent = timerCount + ' seconds left'
    startButton.addEventListener('click', startQuiz)
}
init()

//Timer function
function startTimer () {
    var timeInterval = setInterval(function() {
        if (timerCount >= 0) {
            timerEl.textContent = timerCount + ' seconds left';
            timerCount--;
      } else {
        clearInterval(timeInterval)
      }
    }, 1000);
}

//Quiz function that will start whrn start button is clicked
function startQuiz() {
    questionEl.textContent ='' //Removes welcome copy
    startButton.textContent = '' //Removes start button
    startTimer() //Starts timer function
    quizQs(questionsArray) //Causes the quiz questions and answer options to populate

    function quizQs() {
        //This sets what the question will be and renders the copy
        var question = questionsArray[0].question
        questionEl.textContent = question
        //THE WAY THE BCS TOLD ME
        //This sets up the answers
        var choices = questionsArray[0].choices
        for (var options in choices) {
            let newChoice = document.createElement('li')
            newChoice.textContent = choices[options]
            answerList.appendChild(newChoice)
            newChoice.addEventListener('click', (compare))
        }
    }
//LEFT OFF BELOW. NEED TO FIGURE OUT HOW TO MAKE THIS THING RECOGNIZE THE CHOICE OPTIONS AND SET IT UP SO THAT WHEN ONE IS CLICKED IT RECOGNIZES IT AS WHAT THE ANSWER IS. 
    function compare(event) {
        var element = event.target
        if (element.matches("li") === questionsArray[0].answer && timerCount > 0){
            console.log("you got it right")
            //The stuff I want it to do if correct
            ////Transition to next question and answer set
            ////Add text to "answe-notification" section saying: "You got the last question right!"
            ////Score++ (need to add in a score variable)

        } else if (element.matches("li") !== questionsArray[0].answer && timerCount > 0) {
            console.log("you got it wrong")
            timerCount -= 10
            //The stuff I want it to do if incorrect
            ////Transition to next question and answer set
            ////Add text to "answe-notification" section saying: "You got the last question wrong."
        } else if (timerCount == 0) {
            console.log("time expired") //Not working
            //The stuff I want it to do if time expires
            ////Trigger end game screen (still needs to be built)
        }
    }

}












/* None of the code below is working so commenting out to start over 
//Function that creates answer options
function createOptions() {
    var li = document.createElement('li');
    var linebreak = document.createElement("br");
    li.textContent = answer;
    return(li + linebreak);
}

function startQuiz() {
    startTimer() //starts timer function
    quizQs(questionsArray) //quiz questions and answers fire
}

function quizQs(questionsArray) {
    questionEl.textContent =''//removed 'welcome' copy
    startButton.textContent = '' //removes start button
    for ( var i = 0; i < questionsArray.length; i++ ) {
    var question = questionsArray[i].question
    var choices = questionsArray[i].choices
    var answer = questionsArray[i].answer
    questionEl.textContent = question
    answerList.appendChild(createOptions(choices))
    }

}
*/