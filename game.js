var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var level = 1;
var start = true;
$("div[type='button']").on("click",function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
});
$(document).on("keypress",function(){
    if(start){
        $("#level-title").text("Level " + level);
        nextSequence();
    }
    start = false;
   
});

function nextSequence()
{
    userClickedPattern = [];
    
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    level++;
    
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePressed(name)
{
    $("#"+name).addClass("pressed");

    setTimeout(function(){
        $("#"+name).removeClass("pressed"); 
    },100);
}

function checkAnswer(event)
{
    if(gamePattern[event] === userClickedPattern[event])
    {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();

            },1000)
        }
    }
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
            
        },200);
        startOver();
    }

}


function startOver()
{
    level = 1;
    start = true;
    gamePattern = [];
}



