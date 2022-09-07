//Global vars
var pastScoreList = document.querySelector('.past-scores'); //ul that the past scores will populate into
var storedScores = JSON.parse(localStorage.getItem('user')) || [];
var returnBtn = document.querySelector('.return')

function renderScores() {
    for (var i = 0; i < storedScores.length; i++) {
        var score = storedScores[i].userScore;
        var name = storedScores[i].userName;

        console.log(name + score)

        var li = document.createElement('li')
        li.textContent = name + ' - ' + score

        pastScoreList.appendChild(li)
    }

}
renderScores()



