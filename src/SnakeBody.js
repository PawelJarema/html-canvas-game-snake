class SnakeBody {
    _head
    _length
    _tail

    constructor (initialX, initialY) {
        this._head = this._tail = new SnakeBodySegment(initialX, initialY)
        this._length = 1
    }

    directionIsSafe ([dx, dy]) {
        if (this._length === 1) return true
        const [x, y] = this._head.getPosition()
        const [prevX, prevY] = this._head._prev.getPosition()
        return (x + dx) !== prevX || (y + dy) !== prevY
    }

    getHead () {
        return this._head
    }

    getTail () {
        return this._tail
    }

    growHead ([x, y]) {
        const newSegment = new SnakeBodySegment(x, y, this._head, null)
        this._head._next = newSegment
        this._head = newSegment
        this._length += 1
        return newSegment
    }

    growTail ([x, y]) {
        const newSegment = new SnakeBodySegment(x, y, null, this._tail)
        this._tail._prev = newSegment
        this._tail = newSegment
        this._length += 1
        return newSegment
    }

    retract () {
        if (this._length === 1) return
        const retractedSegment = this._tail
        this._tail = retractedSegment._next
        this._tail._prev = null
        this._length -= 1
        return retractedSegment
    }
}

class SnakeBodySegment {
    _next
    _position
    _prev

    constructor (x, y, previous = null, next = null) {
        this._next = next
        this._position = [x, y]
        this._prev = previous
    }

    getPosition () {
        return this._position
    }
}

export default SnakeBody