# ![Sketchpad](https://raw.github.com/olivierklaver/Sketchpad/master/media%20assets/sketchpad.png)

## Sketchpad - a canvas prototyping framework inspired by Processing and Codea.

## API


### Structure
Structural elements, are functions you can add to your sketch (program). Sketchpad will automatically call these functions.

#### init()

Optional - Called before the canvas element is created.
Can be used to tell sketchpad where to create the canvas element.

Example:
```javascript
function init(){
	canvasContainerSelector = "#stage";
}
```

#### setup()
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

#### canvasContainerSelector
Optional - The parent HTML tag for the canvas element sketchpad creates for you.

Example:
```javascript
function init(){
	canvasContainerSelector = "#stage";
}
```

#### size()
Optional - Set the size of the canvas element.

Example:
```javascript
function setup(){
	size(width, height);
}
```


#### background(color)
Optional - Set the background color.

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

## License

MIT License  
Copyright (c) Olivier Klaver