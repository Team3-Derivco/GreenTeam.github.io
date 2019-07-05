var questionAndAnswers = [];
var category = "";
let btnAction = document.querySelector("#Action");
let btnComedy = document.querySelector("#Comedy");
let btnDrama = document.querySelector("#Drama");
let btnHorror = document.querySelector("#Horror");
let btnSciFi = document.querySelector("#SciFi");
let btnThriller = document.querySelector("#Thriller");

btnAction.addEventListener("click", (e) => {
    category = "ActionQuestions";
    localStorage.setItem("key", category);
    document.location.href = "GamePage.html"
})


btnComedy.addEventListener("click", (e) => {
    category = "ComedyQuestions";
    localStorage.setItem("key", category);
    document.location.href = "GamePage.html"
})


btnDrama.addEventListener("click", (e) => {
    category = "DramaQuestions";
    localStorage.setItem("key", category);
    document.location.href = "GamePage.html"
})


btnHorror.addEventListener("click", (e) => {
    category = "HorrorQuestions";
    localStorage.setItem("key", category);
    document.location.href = "GamePage.html"
})


btnSciFi.addEventListener("click", (e) => {
    category = "SciFiQuestions";
    localStorage.setItem("key", category);
    document.location.href = "GamePage.html"
});


btnThriller.addEventListener("click", (e) => {
    category = "ThrillerQuestions";
    localStorage.setItem("key", category);
    document.location.href = "GamePage.html"
});
