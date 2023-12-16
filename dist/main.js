/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Canvas.js":
/*!***********************!*\
  !*** ./src/Canvas.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Canvas {\r\n    static TEXTALIGN = {\r\n        left: 'start',\r\n        right: 'end',\r\n    }\r\n\r\n    _boardSize\r\n    _canvas\r\n    _id\r\n    _height\r\n    _pixelSize\r\n    _resizeCallback\r\n    _scoreSpace\r\n    _width\r\n\r\n    constructor (id, boardSize) {\r\n        this._boardSize = boardSize\r\n        this._id = id\r\n        this._initialize()\r\n    }\r\n\r\n    _initialize () {\r\n        this._canvas = document.getElementById(this._id)\r\n        addEventListener('resize', this._resize.bind(this))\r\n        this._resize()\r\n    }\r\n\r\n    _resize () {\r\n        const [boardWidth, boardHeight] = this._boardSize\r\n        this._scoreSpace = Math.floor(1.5 * Math.min(window.innerHeight / boardHeight, window.innerWidth / boardWidth))\r\n        const screenHeight = window.innerHeight - this._scoreSpace\r\n        const screenWidth = window.innerWidth\r\n        const pixelHeight = Math.floor(screenHeight / boardHeight) || 1\r\n        const pixelWidth = Math.floor(screenWidth / boardWidth) || 1\r\n        this._pixelSize = Math.min(pixelHeight, pixelWidth)\r\n        this._height = this._pixelSize * boardHeight\r\n        this._width = this._pixelSize * boardWidth\r\n        this._canvas.height = this._height + this._scoreSpace\r\n        this._canvas.width = this._width\r\n        this.clear()\r\n        if (this._resizeCallback) this._resizeCallback()\r\n    }\r\n\r\n    clear () {\r\n        const ctx = this.getContext()\r\n        ctx.clearRect(0, 0, this._width, this._height + this._scoreSpace)\r\n    }\r\n\r\n    clearPixel ([x, y]) {\r\n        const ctx = this.getContext()\r\n        ctx.clearRect(this._pixelSize * x, this._pixelSize * y + this._scoreSpace, this._pixelSize, this._pixelSize)\r\n    }\r\n\r\n    dispose () {\r\n        delete this._resizeCallback\r\n        removeEventListener('resize', this._resize.bind(this))\r\n    }\r\n\r\n    drawPixel ([x, y], color) {\r\n        const ctx = this.getContext()\r\n        ctx.fillStyle = color\r\n        ctx.fillRect(\r\n            parseInt(this._pixelSize * x + 1), \r\n            parseInt(this._pixelSize * y + this._scoreSpace + 1), \r\n            parseInt(this._pixelSize - 1), \r\n            parseInt(this._pixelSize - 1)\r\n        )\r\n    }\r\n\r\n    drawText (text, color = 'blue', align = Canvas.TEXTALIGN.left) {\r\n        const halfScreen = Math.floor(this._width / 2)\r\n        const rightAligned = align === Canvas.TEXTALIGN.right\r\n        const ctx = this.getContext()\r\n        ctx.clearRect((rightAligned ? halfScreen : 0), 0, halfScreen, this._scoreSpace)\r\n\r\n        if (text) {\r\n            const string = String(text)\r\n            const padding = Math.floor(this._scoreSpace / 4)\r\n            const textHeight = Math.floor(this._scoreSpace / 3 * 2)\r\n            const textWidth = ctx.measureText(string).width\r\n            const x = rightAligned\r\n                ? (this._width - textWidth - padding)\r\n                : padding\r\n            const y = textHeight\r\n\r\n            ctx.fillStyle = color\r\n            ctx.font = textHeight + \"px monospace\"\r\n            ctx.fillText(string, x, y)\r\n        }\r\n    }\r\n\r\n    getContext () {\r\n        return this._canvas.getContext('2d', { willReadFrequently: true })\r\n    }\r\n\r\n    getRelativeSize () {\r\n        return [Math.floor(this._width / this._pixelSize), Math.floor(this._height / this._pixelSize)]\r\n    }\r\n\r\n    positionIsBlocked ([x, y]) {\r\n        const ctx = this.getContext()\r\n        const [boardWidth, boardHeight] = this._boardSize\r\n        if (x <= 0 || x >= (boardWidth - 1) || y <= 0 || y >= (boardHeight - 1)) return true\r\n        const image = ctx.getImageData(x * this._pixelSize + 1, y * this._pixelSize + this._scoreSpace + 1, 2, 2)\r\n        return [...image.data].some(rgba => rgba !== 0)\r\n    }\r\n\r\n    onResize (resizeCallback) {\r\n        this._resizeCallback = resizeCallback\r\n        return this\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Canvas);\n\n//# sourceURL=webpack://snake/./src/Canvas.js?");

/***/ }),

/***/ "./src/Food.js":
/*!*********************!*\
  !*** ./src/Food.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/random.js */ \"./utils/random.js\");\n\r\n\r\nclass Food {\r\n    _color\r\n    _x\r\n    _y\r\n\r\n    constructor (color) {\r\n        this._color = color\r\n    }\r\n\r\n    getColor () {\r\n        return this._color\r\n    }\r\n\r\n    getPosition () {\r\n        return [this._x, this._y]\r\n    }\r\n\r\n    placeRandomly (canvas) {\r\n        const [width, height] = canvas.getRelativeSize()\r\n        this._x = (0,_utils_random_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(width - 1, 1)\r\n        this._y = (0,_utils_random_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(height - 1, 1)\r\n        if (canvas.positionIsBlocked(this.getPosition())) {\r\n            return this.placeRandomly(canvas)\r\n        }\r\n        \r\n        return this\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Food);\n\n//# sourceURL=webpack://snake/./src/Food.js?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas.js */ \"./src/Canvas.js\");\n/* harmony import */ var _Food_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Food.js */ \"./src/Food.js\");\n/* harmony import */ var _Keyboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Keyboard.js */ \"./src/Keyboard.js\");\n/* harmony import */ var _Score_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Score.js */ \"./src/Score.js\");\n/* harmony import */ var _Sounds_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sounds.js */ \"./src/Sounds.js\");\n/* harmony import */ var _Snake_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Snake.js */ \"./src/Snake.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst TEXT = {\r\n    hide: '',\r\n    gameOver: 'GAME OVER',\r\n    paused: 'PAUSED',\r\n    pressStart: 'press SPACE',\r\n}\r\n\r\nclass Game {\r\n    _boardSize\r\n    _canvas\r\n    _colors\r\n    _difficultyProgressRate\r\n    _inProgress\r\n    _food\r\n    _frameRate\r\n    _keyboard\r\n    _lastFrame\r\n    _paused\r\n    _score\r\n    _snake\r\n    _sounds\r\n    _startTime\r\n    _text\r\n    \r\n    constructor ({ boardSize, colors, difficultyProgressRate, initialSpeed, selectors: { canvasId, textMessageId }}) {\r\n        this._boardSize = boardSize\r\n        this._canvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvasId, boardSize)\r\n        this._canvas.onResize(this.placeBorders.bind(this))\r\n        this._colors = colors\r\n        this._difficultyProgressRate = difficultyProgressRate\r\n        this._frameRate = initialSpeed\r\n        this._initialSpeed = initialSpeed\r\n        this._keyboard = new _Keyboard_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]()\r\n        this._keyboard.bind([' '], this.startOrPause.bind(this))\r\n        this._score = new _Score_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]('html-canvas-snake-game-hi-score', this._canvas, colors.score)\r\n        this._text = document.getElementById(textMessageId)\r\n        this._text.innerText = TEXT.pressStart\r\n    }\r\n\r\n    end () {\r\n        this._canvas.clear()\r\n        this._inProgress = false\r\n        this._food = undefined\r\n        this._frameRate = this._initialSpeed\r\n        this._paused = false\r\n        this._score.reset()\r\n        this._sounds.pauseMusic()\r\n        this._sounds.playSound('over')\r\n        this._snake.dispose()\r\n        this._text.innerText = TEXT.gameOver\r\n    }\r\n\r\n    async placeBorders () {\r\n        this._canvas.clear()\r\n        this._score.updateHiDisplay()\r\n        this._score.updateCurrDisplay()\r\n\r\n        const color = this._colors.board\r\n        const [width, height] = this._canvas.getRelativeSize()\r\n    \r\n        const bottomY = height - 1\r\n        const leftX = 0\r\n        const rightX = width - 1\r\n        const topY = 0\r\n\r\n        const halfHeight = Math.floor(height / 2)\r\n        const halfWidth = Math.floor(width / 2)\r\n\r\n        let w = 0, h = 0\r\n        while (w < halfWidth || h < halfHeight - 1) {\r\n            if (!this._inProgress) break\r\n\r\n            const fromRightX = width - w - 1\r\n            this._canvas.drawPixel([w, topY], color)\r\n            this._canvas.drawPixel([w, bottomY], color)\r\n            this._canvas.drawPixel([fromRightX, topY], color)\r\n            this._canvas.drawPixel([fromRightX, bottomY], color)\r\n\r\n            const fromBottomY = height - h - 1\r\n            this._canvas.drawPixel([leftX, h], color)\r\n            this._canvas.drawPixel([rightX, h], color)\r\n            this._canvas.drawPixel([leftX, fromBottomY], color)\r\n            this._canvas.drawPixel([rightX, fromBottomY])\r\n\r\n            if (w < halfWidth) w += 1\r\n            if (h < halfHeight) h += 1\r\n\r\n            await new Promise(resolve => setTimeout(resolve, 50));\r\n        }\r\n    }\r\n\r\n    requestNextTick () {\r\n        requestAnimationFrame(this.tick.bind(this))\r\n    }\r\n\r\n    start () {\r\n        this._inProgress = true\r\n        this._snake = new _Snake_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this._keyboard, this._boardSize, this._colors.snake)\r\n        this._sounds = new _Sounds_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]()\r\n        this._sounds.playMusic('music', true)\r\n        this.placeBorders()\r\n        this.requestNextTick()\r\n    }\r\n\r\n    startOrPause () {\r\n        if (this._inProgress) {\r\n            this._paused = !this._paused\r\n\r\n            if (this._paused) {\r\n                this._sounds.pauseMusic()\r\n                this._text.innerText = TEXT.paused\r\n\r\n            } else {\r\n                this._sounds.resumeMusic()\r\n                this._text.innerText = TEXT.hide\r\n            }\r\n            \r\n        } else {\r\n            this._paused = false\r\n            this._text.innerText = TEXT.hide\r\n            this.start()\r\n        }\r\n    }   \r\n\r\n    tick (time) {\r\n        if (!this._inProgress) return\r\n        if (this._paused) return this.requestNextTick()\r\n\r\n        if (this._startTime === undefined) {\r\n            this._startTime = time\r\n        }\r\n\r\n        const deltaTime = time - this._startTime\r\n        const currentFrame = Math.round(deltaTime / (1000 / this._frameRate)) % this._frameRate\r\n\r\n        if (currentFrame !== this._lastFrame) {\r\n            const [newSegment, retractedSegment] = this._snake.move()\r\n            let foodDeployed = this._food != undefined\r\n            \r\n            if (foodDeployed && this._snake.canEat(this._food)) {\r\n                this._canvas.drawPixel(newSegment.getPosition(), this._snake.getColor())\r\n                this._frameRate += this._difficultyProgressRate\r\n                this._currentFrame = Math.round(deltaTime / (1000 / this._frameRate)) % this._frameRate\r\n                this._score.up(10)\r\n                this._sounds.playSound('crunch')\r\n                this._snake.grow(retractedSegment)\r\n                foodDeployed = false\r\n\r\n            } else if (this._canvas.positionIsBlocked(newSegment.getPosition())) {\r\n                return this.end()\r\n\r\n            } else {\r\n                this._canvas.clearPixel(retractedSegment.getPosition())\r\n                this._canvas.drawPixel(newSegment.getPosition(), this._snake.getColor())\r\n            }\r\n            \r\n            if (!foodDeployed) {\r\n                this._food = new _Food_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this._colors.food).placeRandomly(this._canvas)\r\n            }\r\n\r\n            this._canvas.drawPixel(this._food.getPosition(), this._food.getColor())\r\n            this._lastFrame = currentFrame\r\n        }\r\n    \r\n        this.requestNextTick()\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n//# sourceURL=webpack://snake/./src/Game.js?");

/***/ }),

/***/ "./src/Keyboard.js":
/*!*************************!*\
  !*** ./src/Keyboard.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Keyboard {\r\n    _bindings = {}\r\n    _pressed = {}\r\n\r\n    constructor () {\r\n        addEventListener('keydown', this.keyDown.bind(this))\r\n        addEventListener('keyup', this.keyUp.bind(this))\r\n    }\r\n\r\n    bind (keys, callback) {\r\n        if (!Array.isArray(keys)) return this.bind([keys])\r\n        for (const key of keys) {\r\n            this._bindings[key] = callback\r\n        }\r\n    }\r\n\r\n    clear (keys) {\r\n        this._pressed = {}\r\n\r\n        if (Array.isArray(keys)) {\r\n            for (const key of keys) {\r\n                delete this._bindings[key]\r\n            }\r\n\r\n        } else {\r\n            this._bindings = {}\r\n        }\r\n    }\r\n\r\n    dispose () {\r\n        removeEventListener('keydown', this.keyDown.bind(this))\r\n        removeEventListener('keyup', this.keyUp.bind(this))\r\n        this.clear()\r\n    }\r\n\r\n    keyDown (e) {\r\n        const { key } = e\r\n        const callback = this._bindings[key]\r\n        if (callback) callback()\r\n        this._pressed[key] = true\r\n    }\r\n\r\n    keyUp (e) {\r\n        const key = e.key\r\n        delete this._pressed[key]\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyboard);\n\n//# sourceURL=webpack://snake/./src/Keyboard.js?");

/***/ }),

/***/ "./src/Score.js":
/*!**********************!*\
  !*** ./src/Score.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Score {\r\n    _canvas\r\n    _current\r\n    _hi\r\n    _localStorageKey\r\n\r\n    constructor (localStorageKey, canvas, color = 'blue', startValue = 0) {\r\n        this._canvas = canvas\r\n        this._color = color\r\n        this._current = startValue\r\n        this._localStorageKey = localStorageKey\r\n        const previousHi = localStorage.getItem(localStorageKey)\r\n        this._hi = previousHi ? parseInt(previousHi) : 0\r\n        this.updateHiDisplay()\r\n    }\r\n\r\n    dispose () {\r\n        delete this._canvas\r\n    }\r\n\r\n    getCurrentScore () {\r\n        return this._current\r\n    }\r\n\r\n    getHiScore () {\r\n        return this._hi\r\n    }\r\n\r\n    reset (startValue = 0) {\r\n        if (this._hi < this._current) {\r\n            this._hi = this._current\r\n            localStorage.setItem(this._localStorageKey, this._hi)\r\n        }\r\n\r\n        this.updateCurrDisplay()\r\n        this.updateHiDisplay()\r\n        this._current = startValue\r\n    }\r\n\r\n    up (score) {\r\n        this._current += score\r\n        this.updateCurrDisplay()\r\n    }\r\n\r\n    updateCurrDisplay (text) {\r\n        this._canvas.drawText(text || this._current, this._color, this._canvas.constructor.TEXTALIGN.right)\r\n    }\r\n\r\n    updateHiDisplay () {\r\n        this._canvas.drawText(`hi ${this._hi}`, this._color)\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Score);\n\n//# sourceURL=webpack://snake/./src/Score.js?");

/***/ }),

/***/ "./src/Snake.js":
/*!**********************!*\
  !*** ./src/Snake.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _SnakeBody_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SnakeBody.js */ \"./src/SnakeBody.js\");\n\r\n\r\nclass Snake {\r\n    _body\r\n    _color\r\n    _dir\r\n    _keyboard\r\n\r\n    constructor (keyboard, boardSize, color) {\r\n        const [boardWidth, boardHeight] = boardSize\r\n\r\n        this._body = new _SnakeBody_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Math.floor(boardWidth / 2), Math.floor(boardHeight / 2))\r\n        this._color = color\r\n        this._dir = [-1, 0]\r\n        this._keyboard = keyboard\r\n\r\n        keyboard.bind(['ArrowUp','W','w'], () => this.changeDirection(0, -1))\r\n        keyboard.bind(['ArrowDown','S','s'], () => this.changeDirection(0, 1))\r\n        keyboard.bind(['ArrowLeft','A','a'], () => this.changeDirection(-1, 0))\r\n        keyboard.bind(['ArrowRight','D','d'], () => this.changeDirection(1, 0))\r\n    }\r\n\r\n    canEat (food) {\r\n        const [foodX, foodY] = food.getPosition()\r\n        const [x, y] = this._body.getHead().getPosition()\r\n        return x === foodX && y === foodY\r\n    }\r\n\r\n    changeDirection (dx, dy) {\r\n        const dir = [dx, dy]\r\n        if (this._body.directionIsSafe(dir)) {\r\n            this._dir = dir\r\n        } \r\n    }\r\n\r\n    dispose () {\r\n        this._keyboard.clear([\r\n            'ArrowUp','W','w',\r\n            'ArrowDown','S','s',\r\n            'ArrowLeft','A','a',\r\n            'ArrowRight','D','d',\r\n        ])\r\n    }\r\n\r\n    getBody () {\r\n        return this._body\r\n    }\r\n\r\n    getColor () {\r\n        return this._color\r\n    }\r\n\r\n    grow (segment) {\r\n        this._body.growTail(segment.getPosition())\r\n    }\r\n\r\n    move () {\r\n        const [dx, dy] = this._dir\r\n        const [x, y] = this._body.getHead().getPosition()\r\n        const newX = x + dx\r\n        const newY = y + dy\r\n        const newSegment = this._body.growHead([newX, newY])\r\n        const retractedSegment = this._body.retract()\r\n        return [newSegment, retractedSegment]\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Snake);\n\n//# sourceURL=webpack://snake/./src/Snake.js?");

/***/ }),

/***/ "./src/SnakeBody.js":
/*!**************************!*\
  !*** ./src/SnakeBody.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass SnakeBody {\r\n    _head\r\n    _length\r\n    _tail\r\n\r\n    constructor (initialX, initialY) {\r\n        this._head = this._tail = new SnakeBodySegment(initialX, initialY)\r\n        this._length = 1\r\n    }\r\n\r\n    directionIsSafe ([dx, dy]) {\r\n        if (this._length === 1) return true\r\n        const [x, y] = this._head.getPosition()\r\n        const [prevX, prevY] = this._head._prev.getPosition()\r\n        return (x + dx) !== prevX || (y + dy) !== prevY\r\n    }\r\n\r\n    getHead () {\r\n        return this._head\r\n    }\r\n\r\n    getTail () {\r\n        return this._tail\r\n    }\r\n\r\n    growHead ([x, y]) {\r\n        const newSegment = new SnakeBodySegment(x, y, this._head, null)\r\n        this._head._next = newSegment\r\n        this._head = newSegment\r\n        this._length += 1\r\n        return newSegment\r\n    }\r\n\r\n    growTail ([x, y]) {\r\n        const newSegment = new SnakeBodySegment(x, y, null, this._tail)\r\n        this._tail._prev = newSegment\r\n        this._tail = newSegment\r\n        this._length += 1\r\n        return newSegment\r\n    }\r\n\r\n    retract () {\r\n        if (this._length === 1) return\r\n        const retractedSegment = this._tail\r\n        this._tail = retractedSegment._next\r\n        this._tail._prev = null\r\n        this._length -= 1\r\n        return retractedSegment\r\n    }\r\n}\r\n\r\nclass SnakeBodySegment {\r\n    _next\r\n    _position\r\n    _prev\r\n\r\n    constructor (x, y, previous = null, next = null) {\r\n        this._next = next\r\n        this._position = [x, y]\r\n        this._prev = previous\r\n    }\r\n\r\n    getPosition () {\r\n        return this._position\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SnakeBody);\n\n//# sourceURL=webpack://snake/./src/SnakeBody.js?");

/***/ }),

/***/ "./src/Sounds.js":
/*!***********************!*\
  !*** ./src/Sounds.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Sounds {\r\n    _disposed = false\r\n    _format = null\r\n    _music = null\r\n    _path = null\r\n    _sound = null\r\n\r\n    _pathTo (name, format = this._format) {\r\n        if (name) return `${this._path}/${name}${format}`\r\n    }\r\n\r\n    _stop (audio) {\r\n        if (!audio) return\r\n\r\n        audio.pause()\r\n        audio.currentTime = 0\r\n    }\r\n\r\n    constructor (format = '.mp3', path = './src/assets') {\r\n        this._path = path\r\n        this._format = format\r\n    }\r\n\r\n    dispose () {\r\n        this._disposed = true\r\n        this._stop(this._music)\r\n        this._stop(this._sound)\r\n        this._music = null\r\n        this._sound = null\r\n    }\r\n\r\n    playMusic (name, loop = false) {\r\n        this._stop(this._music)\r\n        const music = new Audio(this._pathTo(name))\r\n\r\n        if (loop) music.addEventListener('ended', () => this.playMusic(name, true))\r\n\r\n        this._music = music\r\n        this._music\r\n            .play()\r\n            .then(() => {\r\n                if (this._disposed) this._stop(music)\r\n            })\r\n    }\r\n\r\n    pauseMusic () {\r\n        if (this._music) this._music.pause()\r\n    }\r\n\r\n    playSound (name) {\r\n        this._stop(this._sound)\r\n        this._sound = new Audio(this._pathTo(name))\r\n        this._sound.play()\r\n    }\r\n\r\n    resumeMusic () {\r\n        if (this._music) this._music.play()\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sounds);\n\n//# sourceURL=webpack://snake/./src/Sounds.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game.js */ \"./src/Game.js\");\n\r\n\r\nnew _Game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n    boardSize: [40, 32],\r\n    colors: {\r\n        board: 'gold',\r\n        food: 'red',\r\n        score: 'limegreen',\r\n        snake: 'yellow',\r\n    },\r\n    difficultyProgressRate: 0.5,\r\n    initialSpeed: 6,\r\n    selectors: {\r\n        canvasId: 'canvas',\r\n        textMessageId: 'message',\r\n    },\r\n})\n\n//# sourceURL=webpack://snake/./src/index.js?");

/***/ }),

/***/ "./utils/random.js":
/*!*************************!*\
  !*** ./utils/random.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ random)\n/* harmony export */ });\nfunction random (to, from = 0) {\r\n    return from + Math.floor(Math.random() * (to - from + 1))\r\n}\n\n//# sourceURL=webpack://snake/./utils/random.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;