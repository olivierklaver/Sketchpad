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
	frameRate = 60;
	
    width = 700;
    height = 600;
}
```

#### draw()
Called on every frame after setup has completed.
```javascript
function draw(){
	// this code is called 60x per second…
}
```
Related:
- frameRate

### Environment
```javascript
size(width, height)
```
Set the size of the canvas element.

```javascript
background(color)
```
Set the background color.

```javascript
frameRate
```
Defines how many times per second the draw function is called.
Default: 60 fps.

## License

MIT License  
Copyright (c) Olivier Klaver