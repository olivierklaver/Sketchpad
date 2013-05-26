# ![Sketchpad](https://raw.github.com/olivierklaver/Sketchpad/master/media%20assets/sketchpad.png)

## Canvas prototyping framework inspired by Processing and Codea.

### API

#### Structural
Structural elements, are functions you can add to your sketch (program). Sketchpad will automatically call these functions.

- init()
Called before setup and before the canvas element is created.
```javascript
function init(){...}
```

- setup()
Gets called once, after the canvas element is initialised and before the draw function.
```javascript
function setup(){...}
```

- draw()
Called on every frame after setup has completed.
```javascript
function draw(){
	// this code is called 60x per second…
}
```
Related:
- frameRate

#### Canvas
```javascript
size(width, height)
```
Set the size of the canvas element.

```javascript
background(color)
```
Set the background color.

#### Parameters
```javascript
frameRate
```
Defines how many times per second the draw function is called.
Default: 60 fps.