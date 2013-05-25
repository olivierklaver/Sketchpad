Sketchpad
=========

Canvas prototyping framework inspired by Processing and Codea.

## API

### Structural
Structural elements, are functions you can add to your sketch (program). Sketchpad will automatically call these functions.

```javascript
function init(){...}
```
Called before setup and before the canvas element is created.

```javascript
function setup(){...}
```
setup - Gets called once, after the canvas element is initialised.

```javascript
function draw(){...}
```
draw - Called on every frame after setup has completed.
Related:
- frameRate

### Canvas
```javascript
size(width, height)
```
Set the size of the canvas element.

```javascript
background(color)
```
Set the background color.

### Parameters
```javascript
frameRate
```
Defines how many times per second the draw function is called.
Default: 60 fps.