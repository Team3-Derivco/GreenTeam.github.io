//timer logic
class Countdown {
    constructor() {
        this.duration = 0;
        this.elapsed = 0;
        this.isActive = false;
        this.lastFrameTime = Date.now();

        this.onTick = () => {};
        this.onCompleted = () => {};

        this.tick();

    }

    getTimeLeft() {

        const t = this.duration - this.elapsed;

        return Math.max(0, t);
    }

    pause() {
        this.isActive = false;

        return this;
    }

    reset() {
        this.elapsed = 0;
    }

    setDuration(seconds) {
        this.lastFrameTime = Date.now();
        this.duration = seconds;

        return this;
    }

    start() {
        this.isActive = true;

        return this;
    }

    tick() {
        const currentFrameTime = Date.now();
        const deltaTime = currentFrameTime - this.lastFrameTime;
        this.lastFrameTime = currentFrameTime;


        if (this.isActive) {

            this.elapsed += deltaTime / 1000;
            this.onTick(this.getTimeLeft());

            if (this.getTimeLeft() <= 0) {


                this.pause();
                this.onCompleted();
            }
        }

        window.requestAnimationFrame(this.tick.bind(this));
    }

};
//start of gamePage logic

let btnOptions1 = document.querySelector("#btn0");
let btnOptions2 = document.querySelector("#btn1");
let btnOptions3 = document.querySelector("#btn2");
let btnOptions4 = document.querySelector("#btn3");
const scoreDisplay = document.querySelector('.score');
let questionText = document.querySelector(".question-text");
let progressbar = document.querySelector("#progress-bar");
var value = localStorage.getItem("key");
var i = 0;
var answer = -1;
var pointsPerQuestion = -1;
let userScore = 0;
let img = document.getElementById('image');
const countdown = new Countdown().setDuration(10);
const label = document.querySelector('.time');
var username = localStorage.getItem('user');
var player = document.querySelector('#player');

countdown.onTick = (time) => {

    label.innerHTML = Math.round(time);
};

countdown.onCompleted = () => {
    countdown.reset();
    countdown.start(10)
    reset_animation();
    dbConnection(++i);
};

if (i == 0) {
    localStorage.setItem('score', 0);
    dbConnection(0);
    setTimeout(function() { countdown.start(10) }, 1000)
}

if (value == null || username == null) {
    document.location.href = "index.html"
};
player.innerHTML = localStorage.getItem('user');

function checkProgress() {

    btnOptions1.disabled = true;
    btnOptions2.disabled = true;
    btnOptions3.disabled = true;
    btnOptions4.disabled = true;

    if (!value) {
        document.location.href = "GenreSelection.html"
    };
    if (i == 6) {

        currentKeyLength = [];
        //gets the amount of users currently 
        database.ref(`/Users`).on('value', function(data) {
            currentKeyLength = snapshotToArray(data);
        });
        // A post entry.
        var postData = {
            username: username,
            score: Math.floor(localStorage.getItem('score'))
        }

        console.log(postData);

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('/Users').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['Users/' + newPostKey] = postData;
        database.ref().update(updates)

        setTimeout(function() {
            // Change to end page
            // alert(localStorage.getItem('score'))
            location.href = "summary.html";
        }, 1000);

    }
};

// Converts the snapshot object into an array
function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};


function dbConnection(page) {
    if (page < 7) {
        database.ref(`/${value}`).once('value').then(function(snapshot) {
            quizObject = (snapshot.val()) || 'Anonymous';
            populateGamePage(quizObject, page);
            countdown.reset()
        });
    } else { document.location.href = "summary.html" }
};

function reset_animation() {
    var el = document.getElementById('divTimer');
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null;
}

function populateGamePage(quizObject, page) {

    btnOptions1.disabled = false;
    btnOptions2.disabled = false;
    btnOptions3.disabled = false;
    btnOptions4.disabled = false;
    btnOptions1.classList.remove('rightAns');
    btnOptions2.classList.remove('rightAns');
    btnOptions3.classList.remove('rightAns');
    btnOptions4.classList.remove('rightAns');
    btnOptions1.classList.remove('wrong');
    btnOptions2.classList.remove('wrong');
    btnOptions3.classList.remove('wrong');
    btnOptions4.classList.remove('wrong');

    questionText.innerHTML = quizObject[page].Question;
    btnOptions1.textContent = quizObject[page].Answers[0];
    btnOptions2.textContent = quizObject[page].Answers[1];
    btnOptions3.textContent = quizObject[page].Answers[2];
    btnOptions4.textContent = quizObject[page].Answers[3];
    img.src = quizObject[page].image;

    answer = quizObject[page].AnswerIndex;
    pointsPerQuestion = quizObject[page].Points;
    reset_animation();

    progressbar.innerHTML = `Qustion ${i +1} of 7`;

};



btnOptions1.addEventListener('click', (e) => {
    checkProgress();
    var possibleAnswer = 0;
    ++i;
    var Qscore = getScore(pointsPerQuestion, Math.max(countdown.getTimeLeft()), possibleAnswer)
    if (Qscore > 0) {
        userScore += Qscore;
        localStorage.setItem('score', userScore);
        console.log(localStorage.getItem('score'))
        btnOptions1.classList.add('rightAns');
    } else {
        btnOptions1.classList.add('wrong');

    }
    scoreDisplay.innerHTML = Math.round(userScore);
    setTimeout(function() { dbConnection(i); }, 1000);


});

btnOptions2.addEventListener('click', (e) => {

    checkProgress();
    var possibleAnswer = 1;
    ++i;
    var Qscore = getScore(pointsPerQuestion, Math.max(countdown.getTimeLeft()), possibleAnswer)
    if (Qscore > 0) {
        userScore += Qscore;
        localStorage.setItem('score', userScore);
        console.log(localStorage.getItem('score'))
        btnOptions2.classList.add('rightAns');
    } else {
        btnOptions2.classList.add('wrong');

    }
    scoreDisplay.innerHTML = Math.round(userScore);
    setTimeout(function() { dbConnection(i); }, 1000);
});

btnOptions3.addEventListener('click', (e) => {

    checkProgress();
    var possibleAnswer = 2;
    ++i;
    var Qscore = getScore(pointsPerQuestion, Math.max(countdown.getTimeLeft()), possibleAnswer)
    if (Qscore > 0) {
        userScore += Qscore;
        localStorage.setItem('score', userScore);
        // console.log(localStorage.getItem('score'))
        btnOptions3.classList.add('rightAns');
    } else {
        btnOptions3.classList.add('wrong');

    }
    scoreDisplay.innerHTML = Math.round(userScore);
    setTimeout(function() { dbConnection(i); }, 1000);

});

btnOptions4.addEventListener('click', (e) => {

    checkProgress();
    var possibleAnswer = 3;
    ++i;
    var Qscore = getScore(pointsPerQuestion, Math.max(countdown.getTimeLeft()), possibleAnswer)
    if (Qscore > 0) {
        userScore += Qscore;
        localStorage.setItem('score', userScore);
        console.log(localStorage.getItem('score'))
        btnOptions4.classList.add('rightAns');
    } else {
        btnOptions4.classList.add('wrong');
    }
    scoreDisplay.innerHTML = Math.round(userScore);
    setTimeout(function() {;
        dbConnection(i);
    }, 1000);
});



function addToBoard(name, score) {
    var node = document.createElement("LI"); // Create a <li> node
    var textnode = document.createTextNode(`${name}     ${score}`); // Create a text node
    node.appendChild(textnode);
    document.getElementById("leaderboard-list").appendChild(node); // Append the text to <li>

}


function getScore(questionPointsVal, remainingTime, answerSelection) {

    if (answerSelection == answer) {
        var remainingTimePoints = remainingTime * 1000;
        //console.log(remainingTimePoints);
        if (remainingTime >= 7) { return questionPointsVal + 3 * (remainingTimePoints) } else if (3 <= remainingTime < 7) { return questionPointsVal + 2 * (remainingTimePoints) } else return questionPointsVal + remainingTimePoints;
    } else return 0;;
}