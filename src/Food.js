import random from '../utils/random.js'

class Food {
    _color
    _x
    _y

    constructor (color) {
        this._color = color
    }

    getColor () {
        return this._color
    }

    getPosition () {
        return [this._x, this._y]
    }

    placeRandomly (canvas) {
        const [width, height] = canvas.getRelativeSize()
        this._x = random(width - 1, 1)
        this._y = random(height - 1, 1)
        if (canvas.positionIsBlocked(this.getPosition())) {
            return this.placeRandomly(canvas)
        }
        
        return this
    }
}

export default Food