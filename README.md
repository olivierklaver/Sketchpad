Sketchpad
=========

Canvas prototyping framework inspired by Processing and Codea.

# API

## Structural
Structural elements, are functions you can add to your sketch (program). Sketchpad will automatically call these functions.

'''javascript
init()
'''
Called before setup and before the canvas element is created.

===
setup()
===
setup - Gets called once, after the canvas element is initialised.

===
draw()
===
draw - Called on every frame after setup has completed.
Related:
- frameRate

## Canvas
===
size(width, height)
===
Set the size of the canvas element.

===
background(color)
===
Set the background color.

## Parameters
===
frameRate
===
Defines how many times per second the draw function is called.
Default: 60 fps.