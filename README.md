# Code Quiz

## Description

The code for this application is used to run a coding quiz intended to test the user's base knowledge of JavaScript. 

The code runs off JavaScript for the funcationality and CSS for the style. 

While developing this application I learned a lot more about how JavaScript can influence the HTML in addition to the syntax and the different methods you can use to execute unique things in your code (from starting timers to replacing entire lines of copy).


## Installation

To install, run, and work on the quiz code on your machine, clone down the index.html, assets folder (containing style.css & script.js), highscores-page folder (conatining highscores.html & highscores.js) and README.md files. Then open them in a source code editor.

Worth noting that the assets folder contains an images folder, but this is not necissary to run the code as it just contains the demo gif of the quiz. 


## Usage

The active application will take the user through a series of multiple choice questions. When the user completes the questions or when time runs out, they will be able to see their score and submit it to keep track of their high scores for later viewing.   

Here is a quick demo of the application in action:

![Demo of quiz](/assets/images/code-quiz-demo.gif)


You can also find the live application here: https://rdahltorp.github.io/javascript-code-quiz/


## Features

- Once the "start" button is clicked, the quiz and 60 second timer starts. 
- The user will answer 6 multiple choice questions, and when an answe is selected, on the next screen they will be informed if the last answer was correct or incorrect. 
- If an incorrect answer is chosen the time decearses by 10 seconds, and when time runs out the quiz ends.
- At the end of the quiz the user can see the results and can log it with their initials or name to store it locally for later viewing. These scores can be viewed by clicking the "Highscores" button. 
