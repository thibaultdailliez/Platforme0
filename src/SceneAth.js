class SceneAth extends Phaser.Scene {

    constructor() {

        super("SceneAth");

    }

    preload(){

        this.load.image('crane', 'assets/images/crane.png');
        this.load.image('score', 'assets/images/Score.png');
    }

    create() {

        this.crane = this.add.image(50, 50, 'crane');
        this.Score = this.add.image(1150, 50, 'score');
        this.Cmort = this.add.text(80, 25, mort, { font: '45px Arial', fill: '#ffffff' });
        this.Cscore = this.add.text(1110, 29, score, { font: '40px Arial', fill: '#111111' });

    }




    update(){
        this.Cmort.setText(mort);
        this.Cscore.setText(score) ;
    }

}