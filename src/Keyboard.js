class Keyboard {
    _bindings = {}
    _pressed = {}

    constructor () {
        addEventListener('keydown', this.keyDown.bind(this))
        addEventListener('keyup', this.keyUp.bind(this))
    }

    bind (keys, callback) {
        if (!Array.isArray(keys)) return this.bind([keys])
        for (const key of keys) {
            this._bindings[key] = callback
        }
    }

    clear (keys) {
        this._pressed = {}

        if (Array.isArray(keys)) {
            for (const key of keys) {
                delete this._bindings[key]
            }

        } else {
            this._bindings = {}
        }
    }

    dispose () {
        removeEventListener('keydown', this.keyDown.bind(this))
        removeEventListener('keyup', this.keyUp.bind(this))
        this.clear()
    }

    keyDown (e) {
        const { key } = e
        const callback = this._bindings[key]
        if (callback) callback()
        this._pressed[key] = true
    }

    keyUp (e) {
        const key = e.key
        delete this._pressed[key]
    }
}

export default Keyboard