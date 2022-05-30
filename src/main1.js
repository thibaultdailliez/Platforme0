let gameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1600},
            debug: true,
        },
    },
    scene: new Scene()
};
let game = new Phaser.Game(gameConfig);