/**
 * Sketchpad JS
 *
 * This is a JavaScript framework inspired by Processing and Codea.
 * This library is design for educational purposes and aims to give
 * (new) programmers a simple API to experiment with JavaScript and
 * the HTML5 Canvas API.
 *
 * @version: 0.5
 */

(function Sketchpad(scope) {

    "use strict";

    scope.canvasContainerSelector = "body";
    scope.frameRate = 60;
    scope.width;
    scope.height;
    scope.context;
    scope.mouseX = null;
    scope.mouseY = null;
    scope.mouseIsPressedLeft = false;
    scope.mouseIsPressedRight = false;
    scope.key = "";
    scope.keyIsPressed = false;

    var _sketchpadWrapperId = "sketchpad";
    var _minCanvasWidth = 100;
    var _minCanvasHeight = 100;
    var _context;
    var _verbose = false;


    function initSketchpad() {

        scope.init();


        (function createCanvas() {

            // only create a new canvas element once in html
            if (document.getElementById(_sketchpadWrapperId)) {
                if (_verbose) print("you can only have 1 sketchpad canvas", "warn");
                return;
            }

            // require chromeframe for IE8 or less
            var head = document.getElementsByTagName("head")[0];
            head.innerHTML = "<meta http-equiv=\"X-UA-Compatible\" content=\"chrome=IE8\">" + head.innerHTML;

            // create the sketchpad container in html
            var parentWrapper = document.querySelectorAll(scope.canvasContainerSelector)[0];
            var section = document.createElement("section");
            section.id = _sketchpadWrapperId;

            parentWrapper.appendChild(section);

            // create the canvas element inside the sketchpad section
            var sketchpadWrapper = document.getElementById(_sketchpadWrapperId);
            var canvas = document.createElement("canvas");
            canvas.id = "sketchpadCanvas";

            sketchpadWrapper.appendChild(canvas);

            // prevent the context menu to show on right clicks over the sketchpad canvas
            canvas.addEventListener("contextmenu", function (event) {
                event.preventDefault()
            }, true);

            // get and store the _context
            _context = canvas.getContext("2d");

            _context.fillStyle = "#000";
            _context.strokeStyle = "#000";

            // message if the browser does not support the canvas element
            canvas.innerHTML = "<span>Sorry, but sketchpad requires canvas support</span>";

            // add missing size parameters to the html
            scope.size();

        }());

        // add Global context reference to give users API independent access
        scope.context = _context;

        // run initial setup function (should be overwritten by implementation)
        scope.setup();


        // requestAnimationFrame polyfill via Paul Irish (http://paulirish.com/2011/requestanimationframe-for-smart-animating/)
        (function requestAnimationFramePolyfill() {

            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];

            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                    || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

            if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            }

        }());

        // frameGenerator
        var lastTime = 0;

        (function frameGenerator(_time) {

            requestAnimationFrame(frameGenerator);

            // only call draw if the callback is within the specified frameRate
            var timeSinceLastFrame = _time - lastTime;
            var frameGap = (1000 / scope.frameRate).toFixed(0);
            if (timeSinceLastFrame < frameGap - 3) {
                // drop this frame
                return;
            }

            lastTime = _time;
            scope.draw();

        }(0));


        // Log status update
        if (_verbose) print("Sketchpad is running");
    }


    /**
     * init - Called before setup and before the canvas element is created
     */

    if (!scope.init) {

        scope.init = function () {
        }
    }


    /**
     * setup - Gets called once, after the canvas element is initialised
     */


    if (!scope.setup) {

        scope.setup = function () {
        }
    }


    /**
     * draw - Called on every frame after setup has completed
     */

    if (!scope.draw) {

        scope.draw = function () {
        }
    }


    /**
     * size - http://processing.org/reference/size_.html
     *
     * note: js implementation does not support MODE parameters like (P2D, P3D...)
     */

    scope.size = function (_width, _height) {

        if (!_width || _width < _minCanvasWidth) _width = _minCanvasWidth;
        if (!_height || _height < _minCanvasWidth) _height = _minCanvasWidth;

        var sketchpadCanvas = document.getElementById("sketchpadCanvas");
        sketchpadCanvas.width = _width;
        sketchpadCanvas.height = _height;

        scope.width = _width;
        scope.height = _height;
    };


    /**
     * background - http://processing.org/reference/background_.html
     *
     * note: you can only set colors for now not images
     */

    scope.background = function (_color) {

        _context.fillStyle = _color;
        _context.fillRect(0, 0, _context.canvas.width, _context.canvas.height);
    };


    /**
     * parameter
     *
     * dynamically adds a html slider that can be used to change variable values on the fly.
     *
     * Only supports Global Number type variables.
     */

    scope.parameter = function (/*String*/ _parameter, /*String*/ _label, /*[int]*/ _min, /*[int]*/ _max, /*[int]*/ _step) {

        objParameter(window, _parameter, _label, _min, _max, _step);
    };


    /**
     * objParameter
     *
     * like a regular parameter but with scope support.
     * This allows you to make sliders that reference variables outside of the Global (window) scope.
     * In this use case the first parameter you parse needs to be a scope reference like 'this' or 'myObject'.
     *
     * Only supports Number type variables.
     */

    scope.objParameter = function (/*String*/ _parameter, /*String*/ _key, /*String*/ _label, /*[int]*/ _min, /*[int]*/ _max, /*[int]*/ _step) {

        _min || 0;
        _max || 100;
        _step || 1;

        if (_parameter[_key] < _min) _min = _parameter[_key];
        if (_parameter[_key] > _max) _max = _parameter[_key];

        var sketchpadWrapper = document.getElementById(_sketchpadWrapperId);

        // add a line break
        sketchpadWrapper.appendChild(document.createElement("br"))

        // input slider
        var input = document.createElement("input");
        input.type = "range";
        input.name = _label;
        input.min = _min;
        input.max = _max;
        input.step = _step;
        input.value = _parameter[_key];
        input.onchange = function (event) {

            var slider = event.target;
            var input = document.getElementById(slider.name);
            input.innerHTML = "<span class='lpn'>" + slider.name + " = </span><span class='lpv'>" + slider.value + "</span>";
            _parameter[_key] = Number(slider.value);
        };

        sketchpadWrapper.appendChild(input);

        // input label
        var label = document.createElement("label");
        label.htmlFor = _label;
        label.id = _label;
        label.innerHTML = "<span class='lpn'>" + _label + " = </span><span class='lpv'>" + _parameter[_key] + "</span>";

        sketchpadWrapper.appendChild(label);
    };


    /**
     * Mouse input
     *
     * mouseX
     * mouseY
     * mouseIsPressedLeft
     * mouseIsPressedRight
     * mouseMoved()
     * mousePressed()
     * mouseReleased()
     */

    /**
     * mouseMoved
     */

    var onMouseMove = function (event) {

        var mouseX = event.clientX + window.pageXOffset;
        var mouseY = event.clientY + window.pageYOffset;
        var mousePoint = normalizeMousePosition(mouseX, mouseY);
        scope.mouseX = mousePoint.x;
        scope.mouseY = mousePoint.y;
        scope.mouseMoved(mousePoint.x, mousePoint.y);
    };

    if (!scope.mouseMoved) {

        scope.mouseMoved = function (_x, _y) {
        }
    }

    window.addEventListener("mousemove", onMouseMove, false);


    /**
     * mousePressed
     */

    var onMouseDown = function (event) {

        if (event.target.id === "sketchpadCanvas") event.preventDefault();

        var mouseX = event.clientX;
        var mouseY = event.clientY;
        var mousePoint = normalizeMousePosition(mouseX, mouseY);
        var button;
        if (event.button === 0) {
            button = "left";
            scope.mouseIsPressedLeft = true;
        } else {
            button = "right";
            scope.mouseIsPressedRight = true;
        }
        scope.mousePressed(button, mousePoint.x, mousePoint.y);
    };

    if (!scope.mousePressed) {

        scope.mousePressed = function (_button, _x, _y) {
        }
    }

    window.addEventListener("mousedown", onMouseDown, true);


    /**
     * mouseReleased
     */

    var onMouseUp = function (event) {

        var mouseX = event.clientX;
        var mouseY = event.clientY;
        var mousePoint = normalizeMousePosition(mouseX, mouseY);
        var button;
        if (event.button === 0) {
            button = "left";
            scope.mouseIsPressedLeft = false;
        } else {
            button = "right";
            scope.mouseIsPressedRight = false;
        }
        scope.mouseReleased(button, mousePoint.x, mousePoint.y);
    };

    if (!scope.mouseReleased) {

        scope.mouseReleased = function (_button, _x, _y) {
        }
    }

    window.addEventListener("mouseup", onMouseUp, false);


    /**
     * normalizeMousePosition
     *
     * normalize the Global mouse position relative to the canvas position
     */

    var normalizeMousePosition = function (_x, _y) {

        var canvas = document.getElementById("sketchpadCanvas");
        if (!canvas) return {x: _x, y: _y};

        var mouseX = _x - canvas.offsetLeft;
        var mouseY = _y - canvas.offsetTop;

        return {x: mouseX, y: mouseY}
    };


    /**
     * Keyboard input
     *
     * key
     * keyIsPressed
     * keyPressed()
     * keyReleased()
     */

    /**
     * keyPressed
     */

    var onKeyDown = function (event) {

        var keyChar = mapKeyCodeToString(event.keyCode);

        if ((keyChar.length == 1) && (event.shiftKey)) {
            keyChar = keyChar.toLocaleUpperCase();
        }

        scope.keyIsPressed = true;
        scope.key = keyChar;
        scope.keyPressed(keyChar);
    };

    if (!scope.keyPressed) {

        scope.keyPressed = function (character) {
        }
    }

    window.addEventListener("keydown", onKeyDown, false);


    /**
     * keyReleased
     */

    var onKeyUp = function (event) {

        var keyChar = mapKeyCodeToString(event.keyCode);

        if ((keyChar.length == 1) && (event.shiftKey)) {
            keyChar = keyChar.toLocaleUpperCase();
        }

        scope.keyIsPressed = false;
        scope.key = "";
        scope.keyReleased(keyChar);
    };

    if (!scope.keyReleased) {

        scope.keyReleased = function (character) {
        }
    }

    window.addEventListener("keyup", onKeyUp, false);


    /**
     * mapKeyCodeToString
     */

    var mapKeyCodeToString = function (_keyCode) {

        // Updated version of the lookup table found in the book: JavaScript the Definitive Guide
        var asciiLookupTable = {
            // Keys with words or arrows on them
            8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Spacebar", 33: "PageUp",
            34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 45: "Insert", 46: "Del", 91: "Command", 93: "Command",
            12: "NumLock",

            // Number keys on main keyboard (not keypad)
            48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9",

            // Letter keys. Note that we don't distinguish upper and lower case
            65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R",
            83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z",

            // Keypad numbers and punctuation keys. (Opera does not support these.)
            96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9", 106: "Multiply", 107: "Add", 109: "Subtract", 110: "Decimal",
            111: "Divide",

            // Function keys
            112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 124: "F13", 125: "F14",
            126: "F15", 127: "F16", 128: "F17", 129: "F18", 130: "F19", 131: "F20", 132: "F21", 133: "F22", 134: "F23", 135: "F24",

            // Punctuation keys that don't require holding down Shift
            // Hyphen is nonportable: FF returns same code as Subtract
            59: ";", 61: "=", 186: ";", 187: "=", // Firefox and Opera return 59,61
            188: ",", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"
        };

        var character = asciiLookupTable[_keyCode];

        if (character) {
            return character.toLowerCase();
        } else {
            return "";
        }
    };


    /**
     * Some sugar
     */

    window.print = function (_msg, _priority) {

        if (!_priority) _priority = 0;

        switch (_priority) {
            case "warn":
                console.warn(_msg);
                break;
            case "error":
                console.error(_msg);
                break;
            default:
                console.log(_msg);
                break;
        }
    };


    window.addEventListener("DOMContentLoaded", initSketchpad, false);

}(window));
