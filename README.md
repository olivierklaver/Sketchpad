# ![Sketchpad](https://raw.github.com/olivierklaver/Sketchpad/master/media%20assets/sketchpad.png)

## Sketchpad - a canvas prototyping framework inspired by Processing and Codea.

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

#### draw()
Optional - Called on every frame after setup has completed.

Example:
```javascript
function draw(){
	// this code is called 60x per second…
	console.log("Draw Frame!");
}
```

Related:
- frameRate


### Environment
#### context
A 2d context for the canvas element. This is a normal HTML5 Canvas context object. 
For the specivication please go to:
[HTML Canvas 2D Context - Draft](http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/)

A introduciton to the Canvas:
[Diveintohtml5 - canvas](http://diveintohtml5.info/canvas.html)

A handy cheat cheat - For when you are up and running with the basics.
[HTML5 Canvas Cheat Sheet](http://blog.nihilogic.dk/2009/02/html5-canvas-cheat-sheet.html)

Example:
```javascript
function setup(){
	context.fillStyle   = '#00f'; // blue
	context.strokeStyle = '#f00'; // red
	context.lineWidth   = 4;
}
```

#### canvasContainerSelector
The parent HTML tag for the canvas element sketchpad creates for you.

Example:
```javascript
function init(){
	canvasContainerSelector = "#stage";
}
```

#### size()
Set the size of the canvas element.

Example:
```javascript
function setup(){
	size(width, height);
}
```


#### background(color)
Set the background color.

Examples:
```javascript
background("#000");
```

```javascript
background("rgba(255, 0, 0, 0.4)");
```


#### frameRate
The amount of times per second the draw function is called.

Default:
60

Example:
```javascript
function setup(){
	frameRate = 30;
}
```

## License

MIT License  
Copyright (c) Olivier Klaver