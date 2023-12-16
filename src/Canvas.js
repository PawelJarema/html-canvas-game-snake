class Canvas {
    static TEXTALIGN = {
        left: 'start',
        right: 'end',
    }

    _boardSize
    _canvas
    _id
    _height
    _pixelSize
    _resizeCallback
    _scoreSpace
    _width

    constructor (id, boardSize) {
        this._boardSize = boardSize
        this._id = id
        this._initialize()
    }

    _initialize () {
        this._canvas = document.getElementById(this._id)
        addEventListener('resize', this._resize.bind(this))
        this._resize()
    }

    _resize () {
        const [boardWidth, boardHeight] = this._boardSize
        this._scoreSpace = Math.floor(1.5 * Math.min(window.innerHeight / boardHeight, window.innerWidth / boardWidth))
        const screenHeight = window.innerHeight - this._scoreSpace
        const screenWidth = window.innerWidth
        const pixelHeight = Math.floor(screenHeight / boardHeight) || 1
        const pixelWidth = Math.floor(screenWidth / boardWidth) || 1
        this._pixelSize = Math.min(pixelHeight, pixelWidth)
        this._height = this._pixelSize * boardHeight
        this._width = this._pixelSize * boardWidth
        this._canvas.height = this._height + this._scoreSpace
        this._canvas.width = this._width
        this.clear()
        if (this._resizeCallback) this._resizeCallback()
    }

    clear () {
        const ctx = this.getContext()
        ctx.clearRect(0, 0, this._width, this._height + this._scoreSpace)
    }

    clearPixel ([x, y]) {
        const ctx = this.getContext()
        ctx.clearRect(this._pixelSize * x, this._pixelSize * y + this._scoreSpace, this._pixelSize, this._pixelSize)
    }

    dispose () {
        delete this._resizeCallback
        removeEventListener('resize', this._resize.bind(this))
    }

    drawPixel ([x, y], color) {
        const ctx = this.getContext()
        ctx.fillStyle = color
        ctx.fillRect(
            parseInt(this._pixelSize * x + 1), 
            parseInt(this._pixelSize * y + this._scoreSpace + 1), 
            parseInt(this._pixelSize - 1), 
            parseInt(this._pixelSize - 1)
        )
    }

    drawText (text, color = 'blue', align = Canvas.TEXTALIGN.left) {
        const halfScreen = Math.floor(this._width / 2)
        const rightAligned = align === Canvas.TEXTALIGN.right
        const ctx = this.getContext()
        ctx.clearRect((rightAligned ? halfScreen : 0), 0, halfScreen, this._scoreSpace)

        if (text) {
            const string = String(text)
            const padding = Math.floor(this._scoreSpace / 4)
            const textHeight = Math.floor(this._scoreSpace / 3 * 2)
            const textWidth = ctx.measureText(string).width
            const x = rightAligned
                ? (this._width - textWidth - padding)
                : padding
            const y = textHeight

            ctx.fillStyle = color
            ctx.font = textHeight + "px monospace"
            ctx.fillText(string, x, y)
        }
    }

    getContext () {
        return this._canvas.getContext('2d', { willReadFrequently: true })
    }

    getRelativeSize () {
        return [Math.floor(this._width / this._pixelSize), Math.floor(this._height / this._pixelSize)]
    }

    positionIsBlocked ([x, y]) {
        const ctx = this.getContext()
        const [boardWidth, boardHeight] = this._boardSize
        if (x <= 0 || x >= (boardWidth - 1) || y <= 0 || y >= (boardHeight - 1)) return true
        const image = ctx.getImageData(x * this._pixelSize + 1, y * this._pixelSize + this._scoreSpace + 1, 2, 2)
        return [...image.data].some(rgba => rgba !== 0)
    }

    onResize (resizeCallback) {
        this._resizeCallback = resizeCallback
        return this
    }
}

export default Canvas