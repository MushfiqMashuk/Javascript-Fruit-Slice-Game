// Elements ///
const button = $("#Start-Reset");
const lifeBox = $("#lifeBox");
const gameScore = $("#scoreid");
const gameCanvas = $("#canvas");
const fruit = $("#fruit");
const gameOver = $("#gameOver");
const finalScore = $("#gameScore");
const sound = $("#slicingSound");
const sound2 = $("#yellingSound");
const level = $("#difficulty");

// Normal Variables //

var isPlaying = false;
var score;
var life;
var action;
var step;
var gameLevel;

const fruits = ["apple", "raspberry", "banana", "cactus", "pineapple", "orange", "blueberry", "cactus2", "mango", "watermelon"];


$(function(){

    $("#btn1").click(function(){$("#developer").show()});

    console.log(sound);

    button.click(function(){

        gameLevel = level.val();

        if(isPlaying){
            location.reload();
        }
        else{

            gameOver.hide();
            isPlaying = true;
            score = 0;
            life = 3;

            gameScore.html(score);

            lifeManipulation();

            button.html("Reset Game");

            createFruit();
            
        }
    });


    fruit.mouseover(function(){

        var arr = fruit.attr("src").split('/')[1];

        if(arr === "cactus.png" || arr === "cactus2.png"){
            score -=2;
            sound2[0].play();
        }
        else{
            score++
            sound[0].play();   // It will return an array containing all audio element
        }
        gameScore.html(score);

        //document.getElementById("slicingSound").play();

        clearInterval(action);

        fruit.hide("explode", 500);

        setTimeout(createFruit, 510);

    });

function lifeManipulation() {

    lifeBox.empty();
    
    if(life > 0){

        for (let i = 1; i <= life; i++) {
            lifeBox.append("<img src='images/heart.png' class='life'></img>");
        }
    }

    lifeBox.show();
}

function createFruit(){

    fruit.attr("src", "images/" +fruits[Math.floor(Math.random() * 10)]+ ".png");
   
    fruit.css({

        left: Math.floor(Math.random() * 551),
        top: -60

    });

    fruit.show();

    moveFruits();
}

function moveFruits(){

    stepCount();

    action = setInterval(function(){

        fruit.css({
            top: fruit.position().top + step
        })

        var arr = fruit.attr("src").split('/')[1];

            if(fruit.position().top > gameCanvas.height()){

                var n = lifeBox.find("img");
    
                if(life > 1){

                    if(arr !== "cactus.png" && arr !== "cactus2.png"){
                        n[life-1].remove();
    
                        life--;
                    }
    
                    fruit.attr("src", "images/" +fruits[Math.floor(Math.random() * 10)]+ ".png");
       
                    fruit.css({
    
                        left: Math.floor(Math.random() * 551),
                        top: -60
    
                    });
    
                fruit.show();
    
                stepCount();
                
                }
    
                else{
    
                    lifeBox.hide();
                    finalScore.html(score);
                    gameOver.show()
                    button.html("Start Game");
                    isPlaying = false;
                    stopAction();
                }  
            }
        
    }, 10);

}

function stopAction() {
    clearInterval(action);
    fruit.hide();
}

function stepCount(){
    if(gameLevel === "hard"){
        step = Math.floor(Math.random() * 7) + 4;
    }
    else if(gameLevel === "extreme"){
        step = Math.floor(Math.random() * 9) + 5;
    }
    else{
        step = Math.floor(Math.random() * 5) + 1;
    }
}

});



