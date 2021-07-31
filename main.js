
//health bar variables
var player1Health;
var player2Health;

var player1 = $('#player1')
player1.data('x', 0)
player1.data('y', 0)
player1.data('w', 40)
player1.data('h', 40)

var player2 = $('#player2')
player2.data('x2', 0)
player2.data('y2', 0)
player2.data('w2', 40)
player2.data('h2', 40)

//player1 moves up
$(document).keypress(function(key) {
  if (key.which === 113 && player1.position().top > 0) {
    player1.css("top", "-=10px");
  }
});
//player 1 moves down
$(document).keypress(function(key) {
  if (key.which === 97 && player1.position().top < 180) {
    player1.css("top", "+=10px");
  }
});

//player1's shoot button
$(document).keypress(function(key){
  if (key.which === 120) {
    var bulletDiv;
//bullets created here, bullet animation included here
    if (player1.hasClass('blue')) {
      bulletDiv = '<div class="player1Bullets blue"' + '></div>';
    } else {
      bulletDiv = '<div class="player1Bullets red"' + '></div>';
    }
    //player1 bullet animation
    var newBullet = $(bulletDiv);
    $('.container').append(newBullet);
    var currentP1Position = player1.css("top");
    newBullet.css("top", currentP1Position);
    newBullet.animate({left: '485px'}, 1000, "linear", function(){
      $( newBullet ).remove();
      clearInterval(checker);
    });
    //calling the collision and damage functions
    var checker = setInterval(function() {
      if (collision(newBullet, player2)) {
        subtractHealth();
        clearInterval(checker);
      }
    }
    , 80);
//Collision detection here
    function collision(newBullet, enemyPlayer) {
      // var newBullet = $('<div class="player1Bullets"></div>')
      var x1 = newBullet.offset().left;
      var y1 = newBullet.offset().top;
      var h1 = newBullet.outerHeight(true);
      var w1 = newBullet.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = enemyPlayer.offset().left;
      var y2 = enemyPlayer.offset().top;
      var h2 = enemyPlayer.outerHeight(true);
      var w2 = enemyPlayer.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        return false;
        } else if ($(".player1Bullets").hasClass("blue") && $("#player2").hasClass("blue"))
       {
       return false;
        }
      else if ($(".player1Bullets").hasClass("red") && $("#player2").hasClass("red"))
       {
       return false;
      }
       else {
         return true;
        }
      }
      //player health bar and subtraction by collision
    function subtractHealth() {
      var bar = document.getElementById("player2Health").value;
      bar -= 1;
      document.getElementById("player2Health").value = bar;
      console.log(bar)
  // win checker
      function winChecker() {
      if (bar.value === -1){
      } console.log ("PLAYER 1 WINS!!!");
    };

    }
  }
})

//player2 moves up
$(document).keypress(function(key) {
if (key.which === 112 && player2.position().top > 0) {
  player2.css("top", "-=10px");
}
});
//player2 moves down
$(document).keypress(function(key) {
  if (key.which === 108 && player2.position().top < 180) {
    player2.css("top", "+=10px");
  }
});

//player2's bullet animation
$(document).keypress(function(key) {
  if (key.which === 109) {
    var bulletDiv;
//bullets created here
    if (player2.hasClass('red')) {
      bulletDiv = '<div class="player2Bullets red"' + '></div>';
    } else {
      bulletDiv = '<div class="player2Bullets blue"' + '></div>';
    }
    var newBullet = $(bulletDiv)
    $('.container').append(newBullet)
    var currentP2Position = player2.css("top");
    newBullet.css("top", currentP2Position)
    newBullet.animate({left: '-3px'}, 1000, "linear", function(){
      $( newBullet ).remove();
      clearInterval(checker);
    })
    var checker = setInterval(function(){
      if (collision2(newBullet, player1)) {
        clearInterval(checker);
        subtractHealth();
        }
      }, 120)
//Collision detection here
  function collision2(newBullet, enemyPlayer) {
    // var newBullet = $('<div class="player1Bullets"></div>')
      var x1 = newBullet.offset().left;
      var y1 = newBullet.offset().top;
      var h1 = newBullet.outerHeight(true);
      var w1 = newBullet.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = enemyPlayer.offset().left;
      var y2 = enemyPlayer.offset().top;
      var h2 = enemyPlayer.outerHeight(true);
      var w2 = enemyPlayer.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        return false;
      }
      else if ($(".player2Bullets").hasClass("blue") && $("#player1").hasClass("blue"))
       {
       return false;
        }
      else if ($(".player2Bullets").hasClass("red") && $("#player1").hasClass("red"))
       {
       return false;
      }
       else {
         return true;
      }
    }
    function subtractHealth() {
      var bar = document.getElementById("player1Health").value;
      bar -= 1;
      document.getElementById("player1Health").value = bar;
      console.log(bar);
    }
  }
});

