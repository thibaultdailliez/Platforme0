class Ai {


    constructor(Tableau1,x,y){

        this.scene = Tableau1
        this.range = 800;
        this.timing = 1750;
        this.toucheshield = false;
        //this.ennemys = this.scene.physics.add.sprite(2100,10,'grenouille');
        //this.ennemys.setDisplaySize(50,150);
        //this.scene.physics.add.collider(this.ennemys,this.scene.Platformai);
        ///this.scene.physics.add.collider(this.ennemys,this.scene.sol);
        this.projectil=false;
        this.aiDeath = false;
        this.scene.physics.add.overlap(this.scene.shield, this.scene.bernard.balle, function () {

        })
        if (this.scene.gauche == true ){
            this.scene.shield.setFlipX(true);
            this.scene.shield.setVisible(true);
            this.scene.shield2.body.setEnable(true);
            this.scene.shield.x = this.player.x - 200   ;
            this.scene.shield.y = this.player.y + 100;
        }

        else {
            this.scene.shield.setFlipX(false);
            this.scene.shield.setVisible(true);
            this.scene.shield2.body.setEnable(true);
            this.scene.shield.x = this.player.x + 100 ;
            this.scene.shield.y = this.player.y - 100 ;
        }
    }

    update(){
        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.ennemys.x,this.ennemys.y)<this.range){
            this.fire()
        }
    }
    fire(){
        if(this.aiDeath === false) {
            if (this.projectil === false) {
                this.projectil = true
                this.balle = this.scene.physics.add.sprite(this.ennemys.x, this.ennemys.y, 'Arme1').setSize(5, 5).setDisplaySize(5, 5)
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


                this.scene.physics.add.collider(this.balle, this.ennemys, (balle, ennemys) => {
                    console.log('toucheAI');
                    this.balle.destroy(true);
                    this.ennemys.setVisible(false);
                    this.ennemys.disableBody();
                    this.scene.roboHit.play();
                    this.aiDeath = true;

                })
            }
        }
    }



}