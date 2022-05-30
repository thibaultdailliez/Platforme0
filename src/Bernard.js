class Bernard {


    constructor(scene,x,y){
        this.scene = scene
        this.range = 800;
        this.timing = 1750;
        this.toucheshield = false;
        this.bernard = this.scene.physics.add.sprite(x,y,'ennemy');
        this.bernard.setDisplaySize(50,150);
        this.scene.physics.add.collider(this.bernard,this.scene.Platformai);
        this.scene.physics.add.collider(this.bernard,this.scene.sol);
        this.projectil=false;
        this.aiDeath = false;
        Bernard.tousLesBernards.push(this);

    }

    update(){
        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.bernard.x,this.bernard.y)<this.range){
            this.fire()
        }
    }
    fire(){
        if(this.aiDeath === false) {
            if (this.projectil === false) {
                this.projectil = true
                this.balle = this.scene.physics.add.sprite(this.bernard.x, this.bernard.y, 'Arme1').setSize(5, 5).setDisplaySize(5, 5)
                this.balle.body.setAllowGravity(false)
                this.scene.physics.moveTo(this.balle, this.scene.player.player.x, this.scene.player.player.y)
                this.balle.setVelocityX(this.balle.body.velocity.x * 8)
                this.balle.setVelocityY(this.balle.body.velocity.y * 8)
                const life = this.scene.time.delayedCall(this.timing, () => {
                    this.projectil = false;
                    this.balle.destroy()
                    console.log(this.timing)
                    console.log('balleOUT')
                })

                this.scene.physics.add.overlap(this.balle, this.scene.player.player, (balle, player) => {
                    this.balle.destroy(true);
                    this.scene.player.player.x = this.scene.savesX;
                    this.scene.player.player.y = this.scene.savesY;
                }, null, this)


                this.scene.physics.add.collider(this.balle, this.bernard, (balle, bernard) => {
                    console.log('toucheAI');
                    this.balle.destroy(true);
                    this.bernard.setVisible(false);
                    this.bernard.disableBody();
                    this.scene.roboHit.play();
                    this.aiDeath = true;

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