var DepressionTest=[
    "Do you have any family Problems",
    "Do you feel lonely sometimes",
    "Do you get trouble in sleeping",
    "Are you on some kind of medication",
    ""
]

var length = DepressionTest.length;

var currentQuestionIndex=-1;

function startGame(){
    currentQuestionIndex = -1;
    $(".start-btn").click(function(){
        $(this).toggleClass('hide');
        $("#question-container").removeClass('hide');
        $("#next-button").removeClass('hide');
    })
}
var score = 0;
var final_score = 0;

$("#next-button").click(function(){
    currentQuestionIndex++;
    $("#question").text(DepressionTest[currentQuestionIndex]);
    $("#question-count").text(`${currentQuestionIndex+1}/${DepressionTest.length}`);

    if(currentQuestionIndex==length-1){
        $("#next-button").addClass('hide');
        $("#result-button").removeClass('hide');
        $("#question-count").addClass('hide');

    }
    $(".btn").click(function(){
        score = parseInt($(this).attr('name'));
    })
    // if(score === NaN){
    //     score = 0;
    // }
    score = score ? score : 0;
    final_score+=score;
    console.log(final_score);
});
/*
$("#result-button").click(function(){
    var Result = "";
    final_score = final_score/8;
    if(final_score <= 1){
        Result = "Your have severe Depression.😫";
    }
    if(final_score >1 && final_score <=2){
        Result = "You are in Depression.😩";
    }
    if(final_score >2 && final_score <2.5){
        Result = "You are having Mild Depression.😳";
    }
    if(final_score ==2.5){
        Result = "You are in the Middle.😬";
    }
    if(final_score >2.5 && final_score <=3){
        Result = "You are fine.😊";
    }
    if(final_score>3 && final_score<=4){
        Result = "Chill you are perfectly fine.😄";
    }
    $("#result").text(Result);
});*/

startGame();