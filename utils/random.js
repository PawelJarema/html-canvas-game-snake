export default function random (to, from = 0) {
    return from + Math.floor(Math.random() * (to - from + 1))
}