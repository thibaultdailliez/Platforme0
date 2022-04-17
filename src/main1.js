let gameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: '#000000',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1500},
            debug: true,
        },
    },
    scene: new Tableau1()
};
let game = new Phaser.Game(gameConfig);