var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    // console.log(randomNumber);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    userClickedPattern.splice(0,userClickedPattern.length);
    // console.log(gamePattern);
    $("#"+randomChosenColour).fadeOut(75).fadeIn(75);
    playSound(randomChosenColour);
    $("h1").html("Level  "+level);
    level++;
}

// Animation And Sound
function playSound(colour){
    var audio=new Audio(colour + '.mp3');
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
/**************************************************** */
$(".btn").click(function(event){
    // .target.id is used to target the id of an event
    if(level!==0){
        var userChosenColour=event.target.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkanswer(userClickedPattern.length-1);
    }
});
$(document).keypress(function(){
    if(gamePattern.length===0){
        level++;
        setTimeout(function(){
            nextSequence();
        },500);
    }
});
function checkanswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(currentLevel===gamePattern.length-1){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        var audio=new Audio('wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        $("h1").html("Game Over,Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        startOver();
    }
}
function startOver(){
    gamePattern.splice(0,gamePattern.length);
    level=0;
    userClickedPattern.splice(0,userClickedPattern);
}
