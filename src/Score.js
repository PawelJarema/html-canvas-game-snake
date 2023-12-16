class Score {
    _canvas
    _current
    _hi
    _localStorageKey

    constructor (localStorageKey, canvas, color = 'blue', startValue = 0) {
        this._canvas = canvas
        this._color = color
        this._current = startValue
        this._localStorageKey = localStorageKey
        const previousHi = localStorage.getItem(localStorageKey)
        this._hi = previousHi ? parseInt(previousHi) : 0
        this.updateHiDisplay()
    }

    dispose () {
        delete this._canvas
    }

    getCurrentScore () {
        return this._current
    }

    getHiScore () {
        return this._hi
    }

    reset (startValue = 0) {
        if (this._hi < this._current) {
            this._hi = this._current
            localStorage.setItem(this._localStorageKey, this._hi)
        }

        this.updateCurrDisplay()
        this.updateHiDisplay()
        this._current = startValue
    }

    up (score) {
        this._current += score
        this.updateCurrDisplay()
    }

    updateCurrDisplay (text) {
        this._canvas.drawText(text || this._current, this._color, this._canvas.constructor.TEXTALIGN.right)
    }

    updateHiDisplay () {
        this._canvas.drawText(`hi ${this._hi}`, this._color)
    }
}

export default Score