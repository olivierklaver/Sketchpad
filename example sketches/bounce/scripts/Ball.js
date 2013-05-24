/**
 * Ball Class
 *
 * use like this: 
 *      var myBall = new Ball("rgba(255, 0, 0, .5)", 10, 10, 5);
 *      myBall.move();
 *      myBall.drawShape(context);
 */


var Ball = function(_color, _x, _y, _size) {

    if(_size == undefined) _size = 20;
    
    this.color = _color;
    this.x = _x;
    this.y = _y;
    this.size = _size;
    
    this.xspeed = 0;
    this.yspeed = 0;


    this.move = function() {

        this.x += this.xspeed; 
        this.y += this.yspeed;

        this.detectWalls(width, height);
    };
    
    
    this.drawShape = function(_context) {
    
        _context.fillStyle = this.color;
        _context.fillRect(this.x, this.y, this.size, this.size);
    };
    
    
    this.detectWalls = function(_width, _height) {
        
        if(this.x <= 0) {
            
            this.xspeed *= -1;
        }
        
        if(this.x >= _width - this.size) {

            this.xspeed *= -1;
        }
        
        if(this.y <= 0) {

            this.yspeed *= -1;
        }
        
        if(this.y >= _height - this.size) {

            this.yspeed *= -1;
        }
    };
};