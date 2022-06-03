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
            fps:60,
        }
    },
    scene: [new Scene,new SceneAth,new SceneFin]

};
let game = new Phaser.Game(gameConfig);
let mort = 0
let score = 0