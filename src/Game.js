import Canvas from './Canvas.js'
import Food from './Food.js'
import Keyboard from './Keyboard.js'
import Score from './Score.js'
import Sounds from './Sounds.js'
import Snake from './Snake.js'

const TEXT = {
    hide: '',
    gameOver: 'GAME OVER',
    paused: 'PAUSED',
    pressStart: 'press SPACE',
}

class Game {
    _boardSize
    _canvas
    _colors
    _difficultyProgressRate
    _inProgress
    _food
    _frameRate
    _keyboard
    _lastFrame
    _paused
    _score
    _snake
    _sounds
    _startTime
    _text
    
    constructor ({ boardSize, colors, difficultyProgressRate, initialSpeed, selectors: { canvasId, textMessageId }}) {
        this._boardSize = boardSize
        this._canvas = new Canvas(canvasId, boardSize)
        this._canvas.onResize(this.placeBorders.bind(this))
        this._colors = colors
        this._difficultyProgressRate = difficultyProgressRate
        this._frameRate = initialSpeed
        this._initialSpeed = initialSpeed
        this._keyboard = new Keyboard()
        this._keyboard.bind([' '], this.startOrPause.bind(this))
        this._score = new Score('html-canvas-snake-game-hi-score', this._canvas, colors.score)
        this._text = document.getElementById(textMessageId)
        this._text.innerText = TEXT.pressStart
    }

    end () {
        this._canvas.clear()
        this._inProgress = false
        this._food = undefined
        this._frameRate = this._initialSpeed
        this._paused = false
        this._score.reset()
        this._sounds.pauseMusic()
        this._sounds.playSound('over')
        this._snake.dispose()
        this._text.innerText = TEXT.gameOver
    }

    async placeBorders () {
        this._canvas.clear()
        this._score.updateHiDisplay()
        this._score.updateCurrDisplay()

        const color = this._colors.board
        const [width, height] = this._canvas.getRelativeSize()
    
        const bottomY = height - 1
        const leftX = 0
        const rightX = width - 1
        const topY = 0

        const halfHeight = Math.floor(height / 2)
        const halfWidth = Math.floor(width / 2)

        let w = 0, h = 0
        while (w < halfWidth || h < halfHeight - 1) {
            if (!this._inProgress) break

            const fromRightX = width - w - 1
            this._canvas.drawPixel([w, topY], color)
            this._canvas.drawPixel([w, bottomY], color)
            this._canvas.drawPixel([fromRightX, topY], color)
            this._canvas.drawPixel([fromRightX, bottomY], color)

            const fromBottomY = height - h - 1
            this._canvas.drawPixel([leftX, h], color)
            this._canvas.drawPixel([rightX, h], color)
            this._canvas.drawPixel([leftX, fromBottomY], color)
            this._canvas.drawPixel([rightX, fromBottomY])

            if (w < halfWidth) w += 1
            if (h < halfHeight) h += 1

            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    requestNextTick () {
        requestAnimationFrame(this.tick.bind(this))
    }

    start () {
        this._inProgress = true
        this._snake = new Snake(this._keyboard, this._boardSize, this._colors.snake)
        this._sounds = new Sounds()
        this._sounds.playMusic('music', true)
        this.placeBorders()
        this.requestNextTick()
    }

    startOrPause () {
        if (this._inProgress) {
            this._paused = !this._paused

            if (this._paused) {
                this._sounds.pauseMusic()
                this._text.innerText = TEXT.paused

            } else {
                this._sounds.resumeMusic()
                this._text.innerText = TEXT.hide
            }
            
        } else {
            this._paused = false
            this._text.innerText = TEXT.hide
            this.start()
        }
    }   

    tick (time) {
        if (!this._inProgress) return
        if (this._paused) return this.requestNextTick()

        if (this._startTime === undefined) {
            this._startTime = time
        }

        const deltaTime = time - this._startTime
        const currentFrame = Math.round(deltaTime / (1000 / this._frameRate)) % this._frameRate

        if (currentFrame !== this._lastFrame) {
            const [newSegment, retractedSegment] = this._snake.move()
            let foodDeployed = this._food != undefined
            
            if (foodDeployed && this._snake.canEat(this._food)) {
                this._canvas.drawPixel(newSegment.getPosition(), this._snake.getColor())
                this._frameRate += this._difficultyProgressRate
                this._currentFrame = Math.round(deltaTime / (1000 / this._frameRate)) % this._frameRate
                this._score.up(10)
                this._sounds.playSound('crunch')
                this._snake.grow(retractedSegment)
                foodDeployed = false

            } else if (this._canvas.positionIsBlocked(newSegment.getPosition())) {
                return this.end()

            } else {
                this._canvas.clearPixel(retractedSegment.getPosition())
                this._canvas.drawPixel(newSegment.getPosition(), this._snake.getColor())
            }
            
            if (!foodDeployed) {
                this._food = new Food(this._colors.food).placeRandomly(this._canvas)
            }

            this._canvas.drawPixel(this._food.getPosition(), this._food.getColor())
            this._lastFrame = currentFrame
        }
    
        this.requestNextTick()
    }
}

export default Game