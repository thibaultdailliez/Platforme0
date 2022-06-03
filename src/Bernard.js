class Bernard {


    constructor(scene,x,y){
        this.scene = scene
        this.range = 900;
        this.touche = false;
        this.timing = 1800;
        this.bernard = this.scene.physics.add.sprite(x,y,'turret');
        this.bernard.setDisplaySize(110,80);
        this.scene.physics.add.collider(this.bernard,this.scene.Platformai);
        this.scene.physics.add.collider(this.bernard,this.scene.sol);
        this.projectil=false;
        this.aiDeath = false;
        this.points = 500;
        this.dieParticles = this.scene.add.particles('robotMort');
        this.dieParticles.createEmitter({
            speed: 300,
            lifespan: 600,
            quantity: 50,
            rotate: {min:-90,max:90},
            scale: {start: 2, end: 0},
            alpha:{start: 1, end: 0},
            //angle: { min: -180, max: 0 },
            blendMode: 'ADD',
            on: false
        });
        this.hitParticles = this.scene.add.particles('shieldhit');
        this.hitParticles.createEmitter({
            speed: 300,
            lifespan: 600,
            quantity: 50,
            rotate: {min:-90,max:90},
            scale: {start: 2, end: 0},
            alpha:{start: 1, end: 0},
            angle: { min: -90, max: 70 },
            blendMode: 'ADD',
            on: false
        });

        this.balleParticles = this.scene.add.particles('balleFX');
        this.balleParticles.createEmitter({
            speed: 300,
            lifespan: 600,
            quantity: 50,
            rotate: {min:-90,max:90},
            scale: {start: 2, end: 0},
            alpha:{start: 1, end: 0},
            angle: { min: -90, max: 90 },
            blendMode: 'ADD',
            on: false
        });


        this.tireParticles = this.scene.add.particles('tirerobot');
        this.tireParticles.createEmitter({
            speed: 300,
            lifespan: 600,
            quantity: 50,
            rotate: {min:-90,max:90},
            scale: {start: 2, end: 0},
            alpha:{start: 1, end: 0},
            angle: { min: 220, max: 110 },
            blendMode: 'ADD',
            on: false
        });
        this.smokeFX = {
            frequency:250,
            lifespan: 1500,
            quantity:2,
            x:{min:-32,max:32},
            y:{min:-10,max:10},
            tint:0x808080,
            rotate: {min:-10,max:10},
            speedX: { min: -10, max: 10 },
            speedY: { min: -10, max: -20 },
            scale: {start: 0, end: 1},
            alpha: { start: 1, end: 0 },
            //blendMode: Phaser.BlendModes.ADD,
        };


        Bernard.tousLesBernards.push(this);


    }

    update(){

        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.bernard.x,this.bernard.y)<this.range){
            this.fire()
        }
        this.rand = Phaser.Math.Between(-50,50);
        //console.log('zezeezzeezzeezzezezezezezezezezezezezezezeze')

        if (this.touche === true) {
            this.timing =  2500;
            console.log('timingBoost')
            console.log(this.timing)
            this.touche = false;
        }
        if (this.points === 0){
            this.points = 0;
        }





    }
    particles(){
        this.parts = this.scene.add.particles('balleFX');

        this.particlesEmit= this.parts.createEmitter({
            speed: 50,
            scale: { start: 0.2, end: 0 },
            lifespan: { min: 300, max: 400 },
            blendMode: 'ADD'

        })

        this.parts.setDepth(1);
        this.particlesEmit.startFollow(this)
    }


    fire(){
        let me = this;
        if(this.aiDeath === false) {
            if (this.projectil === false) {
                this.projectil = true
                this.balle = this.scene.physics.add.sprite(this.bernard.x, this.bernard.y, 'Arme1').setSize(10, 10).setDisplaySize(10, 10)
                this.balle.body.setAllowGravity(false)
                this.scene.physics.moveTo(this.balle, this.scene.player.player.x, this.scene.player.player.y)
                this.balle.setVelocityX(this.balle.body.velocity.x * 10)
                this.balle.setVelocityY(this.balle.body.velocity.y * 10)
                this.tireParticles.emitParticleAt(this.balle.x-40,this.balle.y);
                const life = this.scene.time.delayedCall(this.timing, () => {
                    this.projectil = false;
                    this.points = this.points - 10;
                    this.balle.destroy()
                    console.log('timingFire')
                    console.log(this.points,'P')
                    console.log(this.scene.timing,'S')
                    console.log('balleOUT')
                })
                this.scene.physics.add.overlap(this.scene.shield, this.balle, function () {
                    me.touche = true;
                    me.scene.physics.moveTo(me.balle,me.bernard.x,me.bernard.y + me.rand,900)
                    console.log('hit')
                    me.hitParticles.emitParticleAt(me.balle.x,me.balle.y);





                })

                this.scene.physics.add.overlap(this.balle, this.scene.player.player, (balle, player) => {
                    this.balle.destroy(true);
                    mort = mort + 1;
                    score = score -10;
                    this.scene.player.player.x = this.scene.savesX;
                    this.scene.player.player.y = this.scene.savesY;
                    console.log(mort,'mort');
                    console.log(score,'score');
                }, null, this)


                this.scene.physics.add.collider(this.balle, this.bernard, (balle, bernard) => {
                    console.log('toucheAI');
                    this.balle.destroy(true);
                    this.bernard.setVisible(false);
                    this.bernard.disableBody();
                    this.scene.roboHit.play();
                    score = score + this.points;
                    this.aiDeath = true;
                    console.log(score,'score');
                    this.emitSmoke = this.scene.add.particles('robotMort');
                    this.emitSmoke.createEmitter(this.smokeFX);
                    this.emitSmoke.x = this.balle.x+40;
                    this.emitSmoke.y = this.balle.y;

                })
            }
        }
    }



}

/**
 *
 * @type {Bernard[]}
 */
Bernard.tousLesBernards=[];