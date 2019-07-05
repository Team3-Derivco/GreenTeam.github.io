var congratsHeader = document.querySelector('#congratsHeader');
var score = document.querySelector('#score');

if (!localStorage.getItem('user')) {
    location.href = "index.html";
} else {
    congratsHeader.textContent = `Congulations ${localStorage.getItem('user')}`;
    score.innerHTML = `Your Score is ${parseInt(localStorage.getItem('score'))}`;
}

function leaderboard() {
    location.href = "leaderboard.html";
}

function playAgain() {
    location.href = "login.html";
}