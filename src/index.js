import Game from './Game.js'

new Game({
    boardSize: [40, 32],
    colors: {
        board: 'gold',
        food: 'red',
        score: 'limegreen',
        snake: 'yellow',
    },
    difficultyProgressRate: 0.5,
    initialSpeed: 6,
    selectors: {
        canvasId: 'canvas',
        textMessageId: 'message',
    },
})