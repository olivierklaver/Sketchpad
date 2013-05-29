"use strict";

/**
 * OOP example
 */


var ballList = [];


function setup() {
    
    frameRate = 30;
    size(700, 300);
    
    parameter("frameRate", "frameRate", 0, 60);
    objParameter(Ball2, "moveToMouseOffset", "track mouse speed", 1, 100);
    
    // balls
    for(var i = 0; i < 700; i++) {
    
        var ball = new Ball2("rgba(0, 0, 0, .6)", Math.random()*width, Math.random()*height, 1);
        ball.xspeed = 1 + (Math.random() * 4) - 2;
        ball.yspeed = 1 + (Math.random() * 4) - 2;
        
        ballList[i] = ball;
    }
    
    
}


function draw() {
    
    background("rgba(250,250,250,.1)");
    
    for(var i = 0; i < ballList.length; i++) {
    
        var ball = ballList[i];
        ball.move();
        ball.drawShape(context);
    }
    
}