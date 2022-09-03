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
var answerStatus = document.querySelector('.answer-notification')


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

function startQuiz() {
    startButton.textContent = '' //removes start button
    startTimer() //starts timer function
    question1()

    function question1() {
        questionEl.textContent = 'I am a test question. Please hit "correct" for the correct answer and "incorrect" for the incorrect answer.'
        answerList.appendChild(createAnswer('Correct'));
        answerList.appendChild(createAnswer('Incorrect'));
        answerList.addEventListener('click', function(event) {var element = event.target})//WORKING ON THIS SO THAT THE BULLET WILL TRIGER THE EVENTS BELOW> SEE UNIT 4.19 FOR POSSIBLE HELP
        if ('click' === 'correct' && timerCount > 0) {
            answerStatus.textContent = 'You got the last question right!'
            question2()
            //Need to add in a score++ element
         } else if ('click' !== 'correct' && timerCount > 0) {
             timerCount -= 10
             answerStatus.textContent = 'You got the last question wrong.'
             question2()
         } else {
            alert('you ran out of time :(') //this is a placeholder untill i get the score form up.
         }
    }

    function question2() {
        questionEl.textContent = 'You made it to question 2!'
        answerList.appendChild(createAnswer('Not this again...'));
        answerList.appendChild(createAnswer('Yippee! What is question 3?'));
        answerList.addEventListener('click') //THIS IS PROBABLY WRONG, BUT GETTING THIS DOWN NOW TO TRY AND UNDERSTAND WHAT NEEDS TO HAPPEN
        if ('click' === 'Yippee! What is question 3?' && timerCount > 0) {
            answerStatus.textContent = 'You got the last question right!'
            question3()
         } else if ('click' !== 'Not this again...' && timerCount > 0) {
             timerCount -= 10
             answerStatus.textContent = 'You got the last question wrong.'
             question3()
         } else {
            alert('you ran out of time :(') //this is a placeholder untill i get the score form up.
         }
    }

    function question3() {
        questionEl.textContent = 'It is another question!'
        answerList.appendChild(createAnswer('*sigh*'));
        answerList.appendChild(createAnswer('This is my jam'));
        answerList.addEventListener('click')//THIS IS PROBABLY WRONG, BUT GETTING THIS DOWN NOW TO TRY AND UNDERSTAND WHAT NEEDS TO HAPPEN

        if ('click' === 'This is my jam' && timerCount > 0) {
            answerStatus.textContent = 'You got the last question right!'
            quizComplete()
         } else if ('click' !== '*sigh*' && timerCount > 0) {
             timerCount -= 10
             answerStatus.textContent = 'You got the last question wrong.'
             quizComplete()
         } else {
            alert('you ran out of time :(') //this is a placeholder untill i get the score form up.
         }
    }

    function quizComplete() {
        questionEl.textContent = 'Thank you for finishing the quiz! If you would like to save your score please type in your name below. You can find your scores by clicking "View Highscores" above.'

        //FORM GOES HERE
    }
}

