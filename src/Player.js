class Player {
    constructor(Tableau1, Balle, ai){
        let me = this
        this.scene= Tableau1
        this.rand =  Math.random() * (100 - (-100)) + (-100);
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



        /*this.scene.anims.create({
            key: 'idel',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'idel',
                start: 1,
                end: 8,
            }),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'run',
                start: 1,
                end: 6,
            }),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'couprl',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'couprl',
                start: 1,
                end: 7,
            }),
            frameRate: 10,
            repeat: -1});

        this.scene.anims.create({
            key: 'couph',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'couph',
                start: 1,
                end: 7,
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

         */
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
    shield(){
        let me = this
            if (this.shieldOn === false) {
                this.shieldOn = true
                this.shieldObjet = this.scene.physics.add.sprite(this.player.x, this.player.y, 'shield').setSize(200, 300).setDisplaySize(200, 300)
                this.shieldObjet.body.setAllowGravity(false)
                if (this.scene.gauche == true ){
                    this.scene.physics.moveTo(this.shieldObjet, this.scene.player.player.x , this.scene.player.player.y)
                }
                else {
                    this.scene.physics.moveTo(this.shieldObjet, this.scene.player.player.x , this.scene.player.player.y )
                }

                this.shieldObjet.setVelocityX(this.shieldObjet.body.velocity.x * 8)
                this.shieldObjet.setVelocityY(this.shieldObjet.body.velocity.y * 8)
                const life = this.scene.time.delayedCall(400, () => {
                    this.shieldOn = false
                    this.shieldObjet.destroy()
                    console.log('shieldObjet')
                })

                this.scene.physics.add.overlap(this.shieldObjet, this.scene.ai.balle, function () {
                    me.scene.ai.toucheshield = true;
                    console.log('hit')
                    me.scene.physics.moveTo(me.scene.ai.balle, me.scene.ai.sprite.x, me.scene.ai.sprite.y + me.rand, 600);
                    me.scene.swordHit.play();
                })




            }
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
        this.shield();

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