
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var toggle = false;
var level = 0;



$(document).mouseover(function() {
    if (!toggle) {
      $("#level-title").text("Level " + level);
      nextSequence();
      toggle = true;
    }
  });



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    // console.log(userClickedPattern);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $('#level-title').text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass('pressed');
    setTimeout(function(){
        $("#" + currentColour).removeClass('pressed')
    }, 100);
}



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }

    }else{
        console.log("wrong");
        
        $("body").addClass('game-over');
        setTimeout(function(){
            $("body").removeClass('game-over');
        }, 200);
        $('#level-title').text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    toggle = false;
}




