class Ai {


    constructor(Tableau1) {
        this.scene = Tableau1
        this.range = 800;
        this.timing = 1750;
        this.toucheshield = false;
        this.sprite = this.scene.physics.add.sprite(2100,10,'grenouille');
        this.sprite.setDisplaySize(50,150);
        this.scene.physics.add.collider(this.sprite,this.scene.Platformai);
        this.projectil=false;
        this.aiDeath = false;



    }

    update(){
        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.sprite.x,this.sprite.y)<this.range){
            this.fire()
        }
        if (this.toucheshield == true){
            this.timing = this.timing + 1750;
        }
    }
    fire(){
        if(this.aiDeath == false) {
            if (this.projectil === false) {
                this.projectil = true
                this.balle = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'Arme1').setSize(5, 5).setDisplaySize(5, 5)
                this.balle.body.setAllowGravity(false)
                this.scene.physics.moveTo(this.balle, this.scene.player.player.x, this.scene.player.player.y)
                this.balle.setVelocityX(this.balle.body.velocity.x * 8)
                this.balle.setVelocityY(this.balle.body.velocity.y * 8)
                const life = this.scene.time.delayedCall(this.timing, () => {
                    this.projectil = false
                    this.balle.destroy()
                    console.log('yolo')
                })
                /*this.scene.physics.add.overlap(this.balle, this.scene.player.player, (balle, player) => {
                    this.balle.destroy(true);
                    this.scene.player.player.x = this.scene.savesX;
                    this.scene.player.player.y = this.scene.savesY;
                }, null, this) */


                this.scene.physics.add.collider(this.balle, this.sprite, (balle, sprite) => {
                    console.log('toucheAI');
                    this.balle.destroy(true);
                    this.sprite.setVisible(false);
                    this.sprite.disableBody();
                    this.scene.roboHit.play();
                    this.aiDeath = true;


                })
            }
        }
    }



}