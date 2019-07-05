document.querySelector('#login-name').value = "";

function getUser(){
    var username = document.querySelector('#login-name').value;
    console.log(username); 
    if(!username){
        alert('Enter user name !'); 
    }else{
        localStorage.setItem("user", username); 
        localStorage.setItem("score", 0);
        
        location.href = "GenreSelection.html";
    }
}
