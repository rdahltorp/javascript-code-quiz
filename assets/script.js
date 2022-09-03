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

//Global Vars
var timerCount;
var questionEl = document.querySelector('.question');
var answerList = document.querySelector('.answers');
var timerEl = document.querySelector('.timer')
var startButton = document.querySelector('.start-button')


//Function that creates answer options
function createAnswer(answer) {
    var li = document.createElement('li');
    li.textContent = answer;
    return li;
}

//Opening of the page
function init() {
    //answerList.appendChild(createAnswer('START')); – Adding in a button to take this one's place
    timerCount = 60; //NEED TO LINK THIS TO A TIMER. CURRENTLY NOT SHOWING UP
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

//Question function
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

function startQuiz() {
    startButton.textContent = '' //removes start button
    startTimer() //starts timer function
    question1()

    function question1() {
        questionEl.textContent = 'I am a test question. Please hit "correct" for the correct answer and "incorrect" for the incorrect answer.'
        createAnswer('Correct')
        answerList.appendChild(createAnswer('Correct'));
        answerList.appendChild(createAnswer('Incorrect'));
        answerList.addEventListener('click') //THIS IS PROBABLY WRONG, BUT GETTING THIS DOWN NOW TO TRY AND UNDERSTAND WHAT NEEDS TO HAPPEN
        if ('click' === 'correct') {
            alert('You did it!')
         } else {
             timerCount -= 10
         }
    }

    //function question2() {}
}

