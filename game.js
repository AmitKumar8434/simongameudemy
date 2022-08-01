
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var isGameActive=false;
var level;
var currInd=0;

// Functions

function playSound(name){
    var myAudio = new Audio(`sounds/${name}.mp3`);
    myAudio.play();
}

function animate(color){
    $("#"+color).addClass("pressed");
    console.log(name);
    setTimeout(function(){ 
        $("#"+color).removeClass("pressed");
    },100);
}

function nextSequence(){
    var randomNumber=(Math.floor(Math.random()*100))%4;
    gamePattern.push(buttonColors[randomNumber]);
    animate(buttonColors[randomNumber]);
    $("h1").text("LEVEL "+level+"💪");
    level++;
    currInd=0;
    displayNext();
}

function displayNext(){
    var len=buttonColors.length;
    playSound(buttonColors[len-1]);
    userClickedPattern=[];
}
function handleClick(e){
    if(isGameActive===false){
        gameOver();
        return;
    }
    var userChosenColor=e.target.id;
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animate(userChosenColor);
    checkAnswer();
}
function checkAnswer(){
  if(userClickedPattern[currInd]===gamePattern[currInd]){
    currInd++;
  }
  else{
    gameOver();
  }
   if(currInd===gamePattern.length){
     setTimeout(nextSequence,1000);
     return;
   }
}
function gameOver(){
    playSound("wrong");
    $("h1").html(`<h3>GAME OVER</h3><h4>Your Score :${level}🔥</h4><h4>Press Any Key to Restart</h4>`);
    isGameActive=false;
    $(document.body).addClass("game-over");
    setTimeout(function(){ 
        $(document.body).removeClass("game-over");
    },100);
}
function startGame(){
    level=1;
    currInd=0;
    isGameActive=true;
    gamePattern=[];
    userClickedPattern=[];
    nextSequence();
}

// Event Listeners
$(".btn").on("click",handleClick);

$(document).on("keydown",()=>{
    if(isGameActive===false){
        startGame();
    }
})
