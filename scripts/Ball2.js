/**
 * Ball2 Class
 *
 * Inheritance example
 */

var Ball2 = function(_color, _x, _y, _size) {
    
    Ball.apply(this, arguments);

    var moveToMouse = false;
    var trackSpeed  = Math.random() * Ball2.moveToMouseOffset + 2;
    
    this.move = function() {

        if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
            if(!moveToMouse) {
                trackSpeed = Math.random() * Ball2.moveToMouseOffset + 2;
            }
            this.x += (mouseX - this.x) / trackSpeed;
            this.y += (mouseY - this.y) / trackSpeed;
            this.x += -2.5 + Math.random() * 5;
            this.y += -2.5 + Math.random() * 5;
            moveToMouse = true;
        }else{
            if(moveToMouse) {
                this.xspeed += -1 + Math.random() * 2;
                this.yspeed += -1 + Math.random() * 2;
            }
            this.x += this.xspeed; 
            this.y += this.yspeed;
            moveToMouse = false;
        }

        this.detectWalls(width, height);
    }
}

Ball2.moveToMouseOffset = 15;