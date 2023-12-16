class Sounds {
    _disposed = false
    _format = null
    _music = null
    _path = null
    _sound = null

    _pathTo (name, format = this._format) {
        if (name) return `${this._path}/${name}${format}`
    }

    _stop (audio) {
        if (!audio) return

        audio.pause()
        audio.currentTime = 0
    }

    constructor (format = '.mp3', path = './src/assets') {
        this._path = path
        this._format = format
    }

    dispose () {
        this._disposed = true
        this._stop(this._music)
        this._stop(this._sound)
        this._music = null
        this._sound = null
    }

    playMusic (name, loop = false) {
        this._stop(this._music)
        const music = new Audio(this._pathTo(name))

        if (loop) music.addEventListener('ended', () => this.playMusic(name, true))

        this._music = music
        this._music
            .play()
            .then(() => {
                if (this._disposed) this._stop(music)
            })
    }

    pauseMusic () {
        if (this._music) this._music.pause()
    }

    playSound (name) {
        this._stop(this._sound)
        this._sound = new Audio(this._pathTo(name))
        this._sound.play()
    }

    resumeMusic () {
        if (this._music) this._music.play()
    }
}

export default Sounds