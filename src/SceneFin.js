class SceneFin extends Phaser.Scene {

    constructor() {

        super("SceneFin");

    }

    preload(){

        this.load.image('fin', 'assets/images/fin.png');
        this.load.image('score', 'assets/images/Score.png');

    }

    create() {


        this.finp = this.add.image(625, 100, 'fin');
        this.finp.scale = 1.5;


    }




    update(){

    }

}