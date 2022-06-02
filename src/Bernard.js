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


    fire(){
        let me = this;
        if(this.aiDeath === false) {
            if (this.projectil === false) {
                this.projectil = true
                this.balle = this.scene.physics.add.sprite(this.bernard.x, this.bernard.y, 'Arme1').setSize(5, 5).setDisplaySize(5, 5)

                this.balle.body.setAllowGravity(false)
                this.scene.physics.moveTo(this.balle, this.scene.player.player.x, this.scene.player.player.y)
                this.balle.setVelocityX(this.balle.body.velocity.x * 10)
                this.balle.setVelocityY(this.balle.body.velocity.y * 10)
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