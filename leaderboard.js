
var leaderboard = document.getElementById('leaderboard');
var isLeaderCreated = false; 


    database.ref(`/Users`).orderByChild("score").on('value', function (datas) {
        var le = "";
        if(!isLeaderCreated){
            le =  document.createElement("div");    
            le.id = "leaderInner";
            isLeaderCreated = true; 
        }else{
            var le =document.getElementById("leaderInner");
            le.parentNode.removeChild(le);
        }
         
        le.innerHTML = "";
        leaderboard.append(le);
        
        var scoreBoard = [];
        var leader = [];
        var i = 0;

        datas.forEach(data => {
            scoreBoard[i++] = data.val();
        })

        leader = scoreBoard.reverse();
        var innerLe = null;
        for(var z = 0; z < leader.length; z++){
            innerLe =  document.createElement("div"); 
            innerLe.innerHTML = leader[z].username +"    " +leader[z].score;
           
            le.append(innerLe);
        }  
    });
