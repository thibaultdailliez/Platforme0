class Boss{


    constructor(scene){
        this.scene = scene
        this.bossrange = 800;
        this.bossrange2 = 800;
        this.bosstouche = false;
        this.bosstiming = 1800;
        this.bosstouche2 = false;
        this.bosstiming2 = 3500;
        this.bossJpp = false;
        this.boss = this.scene.physics.add.sprite(25000,0,'roboton');
        this.scene.physics.add.collider(this.boss,this.scene.Platformai);
        this.scene.physics.add.collider(this.boss,this.scene.sol);
        this.boss.setFlipX(true);
        this.bossprojectil=false;
        this.bossprojectil2=false;
        this.bossDeath = false;
        this.bosspoints = 500;
        this.scene.anims.create({
            key: 'Robot',
            frames: this.scene.anims.generateFrameNumbers('roboton', { start: 0, end: 4 }),//CE SONT LES IMAGES 0/1/2/3 QUI SONT JOUEES
            frameRate: 6,//NOMBRE D'IMAGES JOUEES
            repeat: 0//REPETITION INFINIE
        });

    }

    update(){

        /*if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.boss.x,this.boss.y)<1000){
            console.log('ro')
            this.AnimBoss()
        }*/
        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.boss.x,this.boss.y)<this.bossrange){
            this.bossfire()
        }
        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.boss.x,this.boss.y)<this.bossrange2){
            this.bossfire2()
            if (this.bosstouche2 === false){
                this.scene.physics.moveTo(this.bossballe2, this.scene.player.player.x, this.scene.player.player.y);
                this.bossballe2.setVelocityX(this.bossballe2.body.velocity.x * 8);
                this.bossballe2.setVelocityY(this.bossballe2.body.velocity.y * 8);
                console.log(this.bosstiming2);
            }
        }

        this.bossrand = Phaser.Math.Between(-50,50);

        if (this.bosstouche === true) {
            this.bosstiming =  2500;
            console.log('bosstimingBoost')
            console.log(this.bosstiming)
            this.bosstouche = false;
        }
        if (this.bosstouche2 === true) {
            this.bosstiming2 =  3500;
            console.log('bosstimingBoost2')
            console.log(this.bosstiming2)
            this.bosstouche2 = false;
        }
        if (this.bosspoints === 0){
            this.bosspoints = 0;
        }
        if (this.bossJpp === true){
            this.bossballe2.destroy()
            this.bossprojectil2 = false;
            this.bossJpp = false;

        }




    }
    AnimBoss(){
        this.boss.play('Robot', true);
    }
    bossfire(){
        let me = this;
        if(this.bossDeath === false) {
            if (this.bossprojectil === false) {
                this.bossprojectil = true
                this.bossballe = this.scene.physics.add.sprite(this.boss.x, this.boss.y, 'Arme1').setSize(5, 5).setDisplaySize(5, 5)
                this.bossballe.body.setAllowGravity(false)
                this.scene.physics.moveTo(this.bossballe, this.scene.player.player.x, this.scene.player.player.y)
                this.bossballe.setVelocityX(this.bossballe.body.velocity.x * 10)
                this.bossballe.setVelocityY(this.bossballe.body.velocity.y * 10)
                const life = this.scene.time.delayedCall(this.bosstiming, () => {
                    this.bossprojectil = false;
                    this.bosspoints = this.bosspoints - 10;
                    this.bossballe.destroy()
                    console.log('timingFire')
                    console.log(this.bosspoints,'P')
                    console.log(this.bosstiming,'S')
                    console.log('balleOUT')
                })
                this.scene.physics.add.overlap(this.scene.shield, this.bossballe, function () {
                    me.bosstouche = true;
                    me.scene.physics.moveTo(me.bossballe,me.boss.x,me.boss.y + me.bossrand,900)
                    console.log('hit')





                })


                this.scene.physics.add.overlap(this.bossballe, this.scene.player.player, (bossballe, player) => {
                    this.bossballe.destroy(true);
                    mort = mort + 1;
                    score = score -10;
                    this.scene.player.player.x = this.scene.savesX;
                    this.scene.player.player.y = this.scene.savesY;
                    console.log(mort,'mort');
                    console.log(score,'score');

                }, null, this)



                this.scene.physics.add.collider(this.bossballe, this.boss, (bossballe, boss) => {
                    console.log('toucheboss');
                    this.bossballe.destroy(true);
                    this.boss.setVisible(false);
                    this.boss.disableBody();
                    this.scene.roboHit.play();
                    score = score + this.bosspoints;
                    this.bossDeath = true;
                    console.log(score,'score');

                })
            }
        }
    }
    bossfire2(){
        let me = this;
        if(this.bossDeath === false) {
            if (this.bossprojectil2 === false) {
                this.bossprojectil2 = true
                this.bossballe2 = this.scene.physics.add.sprite(this.boss.x, this.boss.y, 'Arme1').setSize(5, 5).setDisplaySize(5, 5)
                this.bossballe2.body.setAllowGravity(false)
                const life = this.scene.time.delayedCall(this.bosstiming2, () => {
                    this.bossprojectil2 = false;
                    this.bosspoints = this.bosspoints - 10;
                    this.bossballe2.destroy()
                    console.log('timingFire')
                    console.log(this.bosspoints,'P')
                    console.log(this.bosstiming,'S')
                    console.log('balleOUT')
                })
                this.scene.physics.add.overlap(this.scene.shield, this.bossballe2, function () {
                    me.bosstouche2 = true;
                    me.scene.physics.moveTo(me.bossballe2,me.boss.x,me.boss.y + me.bossrand,900)

                    console.log('hit')





                })


                this.scene.physics.add.overlap(this.bossballe2, this.scene.player.player, (bossballe2, player) => {
                    this.bossJpp = true;
                    mort = mort + 1;
                    score = score -10;
                    this.scene.player.player.x = this.scene.savesX;
                    this.scene.player.player.y = this.scene.savesY;
                    console.log(mort,'mort');
                    console.log(score,'score');
                }, null, this)



                this.scene.physics.add.collider(this.bossballe2, this.boss, (bossballe2, boss) => {
                    console.log('suicide');
                    this.bossballe2.destroy(true);
                    this.boss.setVisible(false);
                    this.boss.disableBody();
                    this.scene.roboHit.play();
                    this.scene.score = this.scene.score + this.bosspoints;
                    this.bossDeath = true;
                    console.log(score,'score');

                })
            }

        }
    }



}

