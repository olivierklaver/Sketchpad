# ![Sketchpad](https://raw.github.com/olivierklaver/Sketchpad/master/media%20assets/sketchpad.png)

## Sketchpad - a canvas prototyping framework inspired by Processing and Codea.

Sketchpad is a simple framework for prototyping HTML5 Canvas programs quickly.


## API


### Structure
Structural elements, are functions you can add to your sketch (program). Sketchpad will automatically call these functions.

- #### init()

	Optional - Called before the canvas element is created.
Can be used to tell sketchpad where to create the canvas element.

	Example:
	```javascript
	function init(){
		canvasContainerSelector = "#stage";
	}
	```

- #### setup()
	Optional - Called once, after the canvas element is initialised and before the draw function.

	Example:
	```javascript
	function setup(){
		// set FPS
		frameRate = 30;
	
		// set canvas size
    	width = 700;
    	height = 600;
	}
	```

- #### draw()
	Optional - Called on every frame after setup has completed.

	Example:
	```javascript
	function draw(){
		// this code is called 60x per second…
		console.log("Draw Frame!");
	}
	```

### Environment

- #### context
	A 2d context for the canvas element. This is a normal HTML5 Canvas context object.
	
	W3C's canvas 2d context specification:
[HTML Canvas 2D Context - Draft](http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/)

	Introduction to the canvas:
[Diveintohtml5 - canvas](http://diveintohtml5.info/canvas.html)

	Handy cheat cheat - For when you are up and running with the basics.
[HTML5 Canvas Cheat Sheet](http://blog.nihilogic.dk/2009/02/html5-canvas-cheat-sheet.html)

	Example:
	```javascript
	function setup(){
		context.fillStyle   = '#00f'; // blue
		context.strokeStyle = '#f00'; // red
		context.lineWidth   = 4;
	}
	```

- #### size()
	Set the size of the canvas element.

	Example:
	```javascript
	function setup(){
		size(width, height);
	}
	```

- #### frameRate
	The amount of times per second the draw function is called.

	Default:
	60

	Example:
	```javascript
	function setup(){
		frameRate = 30;
	}
	```

- #### canvasContainerSelector
	The parent HTML tag for the canvas element sketchpad creates for you.
	Default:
	body

	Example:
	```html
	…
		<body>
			<div id="stage"> </div>
		</body>
	</html>
	```
	
	```javascript
	function init(){
		canvasContainerSelector = "#stage";
	}
	```
	
- #### background(color)
	Set the canvas background color.

	Examples:
	```javascript
	background("#000");
	```

	```javascript
	background("rgba(255, 0, 0, 0.4)");
	```


### Parameters
Dynamically adds a html slider that can be used to change properties on the fly.


- #### parameter(global, label, min, max, steps)
	Use for global variables.

	Example:
	```javascript
	parameter("frameRate", "FPS:", 0, 60);
	```

- #### objParameter(scope, var, label, min, max, steps)
	For object properties.

	Example:
	```javascript
	var ball = {x:50, y:50};
	objParameter(ball, "x", "x position:", 1, 100);	```


### Input

- #### mouseX
	The x position of the cursor, relative to the canvas position on the screen.

	Example:
	```javascript
	var ball = {x:50, y:50};
	ball.x = mouseX;
	ball.y = mouseY;
	```

- #### mouseY
	The y position of the cursor, relative to the canvas position on the screen.

	Example:
	```javascript
	var ball = {x:50, y:50};
	ball.x = mouseX;
	ball.y = mouseY;
	```
	
- #### mouseIsPressedLeft
	Is the left mouse button pressed.

	Example:
	```javascript
	if(mouseIsPressedLeft){
		shoot();
	}
	```
	
- #### mouseIsPressedRight
	Is the right mouse button pressed.

	Example:
	```javascript
	if(mouseIsPressedRight){
		reload();
	}
	```

- #### key
	The name of the (keyboard) key that was pressed last.

	Example:
	```javascript
	if(keyIsPressed){
		console.log(key);
	}
	```
	
- #### keyIsPressed
	True if a key is pressed.

	Example:
	```javascript
	if(keyIsPressed){
		console.log(key);
	}
	```


## IMPORTANT NOTE
Sketchpad is a prototyping tool that is not designed to be used in production websites.
The program will dynamically add a range of variables and functions to
the _Global Object (window). Hence this library should not be used in a production
 * site, since sketchpad code may conflict with other JavaScript libraries.
 * The code also makes no afford to validate browser support for most of the
 * language features used.
 * All this is done by design, since the main purpose of this library is to give
 * novice programmers a clean API that allows them to visually learn about core
 * programming principles.


## License

MIT License  
Copyright (c) Olivier Klaver