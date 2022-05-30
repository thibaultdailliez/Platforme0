class Player {
    constructor(scene){
        let me = this
        this.scene= scene
        this.shieldOn = false
        this.player = this.scene.physics.add.sprite(100, 600, 'idle');
        this.player.scale=0.6
        //Taille de la hitbox du Player
        this.player.setBodySize(this.player.width-250, this.player.height-20).setOffset(20, 18);
        //this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.player.body.setAllowGravity(true);
        //this.physics.add.collider(this.player, platforms);.0



        //ANIMATION

        this.scene.anims.create({
            key: 'idel',
            frames: this.scene.anims.generateFrameNumbers('idle', { start: 0, end: 7 }),//CE SONT LES IMAGES 0/1/2/3 QUI SONT JOUEES
            frameRate: 6,//NOMBRE D'IMAGES JOUEES
            repeat: -1//REPETITION INFINIE
        });
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('run', { start: 0, end: 5 }),//CE SONT LES IMAGES 0/1/2/3 QUI SONT JOUEES
            frameRate: 6,//NOMBRE D'IMAGES JOUEES
            repeat: -1//REPETITION INFINIE
        });
        this.scene.anims.create({
            key: 'couprl',
            frames: this.scene.anims.generateFrameNumbers('couprl', { start: 0, end: 6 }),//CE SONT LES IMAGES 0/1/2/3 QUI SONT JOUEES
            frameRate: 20,//NOMBRE D'IMAGES JOUEES
            repeat: 0//REPETITION INFINIE
        });
        this.scene.anims.create({
            key: 'couph',
            frames: this.scene.anims.generateFrameNumbers('couph', { start: 0, end: 6 }),//CE SONT LES IMAGES 0/1/2/3 QUI SONT JOUEES
            frameRate: 20,//NOMBRE D'IMAGES JOUEES
            repeat: 0//REPETITION INFINIE
        });

    }



    Right(){
        this.player.setVelocityX(650);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('run', true);
        }
        else{
            this.player.play('run', false);
        }

    }
    Left(){
        this.player.setVelocityX(-650);
        this.player.setFlipX(true);
        if (this.player.body.onFloor()) {
            this.player.play('run', true);
        }
        else{
            this.player.play('run', false);
        }

    }
    Jump(){
        if (this.dejaAppuye== false) {
        }
        else { //SINON
            this.dejaAppuye = true;
            if (this.player.body.onFloor()){0
                this.player.setVelocityY(-1000);
                this.DashOn = 1;
            }

        }
    }


    SwordRL(){

        this.player.play('couprl', true);

        this.player.setVelocityX(0);
        this.player.setVelocityY(0);

        if (this.scene.gauche === true ){
            this.scene.shield.setFlipX(true);
            this.scene.shield.setVisible(true);
            this.scene.shield.body.setEnable(true);
            this.scene.shield.x = this.player.x - 200   ;
            this.scene.shield.y = this.player.y + 100;
        }

        else {
            this.scene.shield.setFlipX(false);
            this.scene.shield.setVisible(true);
            this.scene.shield.body.setEnable(true);
            this.scene.shield.x = this.player.x + 100 ;
            this.scene.shield.y = this.player.y - 100 ;
        }

    }

    SwordUp(){
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);


        if (this.scene.UpOn== true ){
            this.scene.shield2.setVisible(true);
            this.scene.shield2.body.setEnable(true);
            if (this.player.body.onFloor()) {
                this.player.play('couph', true);
            }
            else{
                this.player.play('couph', false);
            }

        }


    }






}