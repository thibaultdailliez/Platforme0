class Player {
    constructor(Tableau1, Balle){
        let me = this
        this.scene= Tableau1
        this.player = this.scene.physics.add.sprite(100, 600, 'player');
        this.player.scale=0.6
        //Taille de la hitbox du Player
        this.player.body.setSize(this.player.width-65, this.player.height-20).setOffset(40, 18);
        //this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.player.body.setAllowGravity(true);
        //this.physics.add.collider(this.player, platforms);.0

        //ANIMATION


        this.scene.anims.create({
            key: 'idel',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'idel',
                start: 1,
                end: 8,
            }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'run-',
                start: 1,
                end: 6,
            }),
            frameRate: 10,
            repeat: -1});



        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'jump',
                start: 1,
                end: 6,
            }),
            frameRate: 10,
            repeat: -1
        });

    }
    Right(){
        this.player.setVelocityX(400);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true);
        }
        else{
            this.player.play('walk', false);
        }

    }
    Left(){
        this.player.setVelocityX(-400);
        this.player.setFlipX(true);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true);
        }
        else{
            this.player.play('walk', false);
        }
    }
    Jump(){
        if (this.dejaAppuye== false) {
        }
        else { //SINON
            this.dejaAppuye = true;
            if (this.player.body.onFloor()){
                this.player.setVelocityY(-1000);
                this.DashOn = 1;
            }
            if (this.DashOn === 1 && !this.player.body.onFloor()) {
                if(this.scene.gauche === true){
                    this.player.x = this.player.x -100;
                }
                else{
                    this.player.x = this.player.x +100;
                }
                this.player.setVelocityY(-300);
                this.DashOn = 0;
            }
        }
    }
    SwordRL(){
        if (this.scene.gauche == true ){
            this.scene.shield.setVisible(true);
            this.scene.shield.body.setEnable(true);
        }
        else{
            this.scene.shield.setVisible(true);
            this.scene.shield.body.setEnable(true);
        }
    }

    SwordUp(){
        if (this.scene.gauche == true ){
            this.scene.shield.setVisible(true);
            this.scene.shield.body.setEnable(true);
        }
        else{
            this.scene.shield.setVisible(true);
            this.scene.shield.body.setEnable(true);
        }
    }






}