import SnakeBody from './SnakeBody.js'

class Snake {
    _body
    _color
    _dir
    _keyboard

    constructor (keyboard, boardSize, color) {
        const [boardWidth, boardHeight] = boardSize

        this._body = new SnakeBody(Math.floor(boardWidth / 2), Math.floor(boardHeight / 2))
        this._color = color
        this._dir = [-1, 0]
        this._keyboard = keyboard

        keyboard.bind(['ArrowUp','W','w'], () => this.changeDirection(0, -1))
        keyboard.bind(['ArrowDown','S','s'], () => this.changeDirection(0, 1))
        keyboard.bind(['ArrowLeft','A','a'], () => this.changeDirection(-1, 0))
        keyboard.bind(['ArrowRight','D','d'], () => this.changeDirection(1, 0))
    }

    canEat (food) {
        const [foodX, foodY] = food.getPosition()
        const [x, y] = this._body.getHead().getPosition()
        return x === foodX && y === foodY
    }

    changeDirection (dx, dy) {
        const dir = [dx, dy]
        if (this._body.directionIsSafe(dir)) {
            this._dir = dir
        } 
    }

    dispose () {
        this._keyboard.clear([
            'ArrowUp','W','w',
            'ArrowDown','S','s',
            'ArrowLeft','A','a',
            'ArrowRight','D','d',
        ])
    }

    getBody () {
        return this._body
    }

    getColor () {
        return this._color
    }

    grow (segment) {
        this._body.growTail(segment.getPosition())
    }

    move () {
        const [dx, dy] = this._dir
        const [x, y] = this._body.getHead().getPosition()
        const newX = x + dx
        const newY = y + dy
        const newSegment = this._body.growHead([newX, newY])
        const retractedSegment = this._body.retract()
        return [newSegment, retractedSegment]
    }
}

export default Snake