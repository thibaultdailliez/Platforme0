class Ai {


    constructor(Tableau1) {
        this.scene = Tableau1
        this.sprite = this.scene.physics.add.sprite(2000,10,'grenouille');
        this.sprite.setDisplaySize(50,150 );
        this.scene.physics.add.collider(this.sprite,this.scene.sol);
        this.projectil=false;

        /*  this.scene.anims.create(
               {
                   key: 'walkfeu',
                   frames: this.scene.anims.generateFrameNumbers('walkfeu', { start: 1, end: 7 }),
                   frameRate: 16,
                   repeat: -1,
               });
           this.enemy.play('walkfeu')

           this.scene.anims.create(
               {
                   key: 'idlefeu',
                   frames: this.scene.anims.generateFrameNumbers('idlefeu', { start: 1, end: 7 }),
                   frameRate: 12,
                   repeat: -1
               });
           this.sprite.play('idlefeu')*/
    }

    update(){
        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.sprite.x,this.sprite.y)<500){
            this.fire()
        }
    }
    fire(){
        if(this.projectil===false) {
            this.projectil = true
            this.balle = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'Arme1').setSize(5, 5).setDisplaySize(5, 5)
            this.balle.body.setAllowGravity(false)
            this.scene.physics.moveTo(this.balle, this.scene.player.player.x,this.scene.player.player.y)
            this.balle.setVelocityX(this.balle.body.velocity.x*5)
            this.balle.setVelocityY(this.balle.body.velocity.y*5)
            const life=this.scene.time.delayedCall(4000,()=>{
                this.balle.destroy()
                this.projectil=false
                console.log('yolo')
            })
            this.scene.physics.add.overlap(this.balle, this.scene.player.player, (balle, player) => {
                this.balle.destroy(true);
                this.scene.player.player.x = this.scene.savesX;
                this.scene.player.player.y = this.scene.savesY;
            }, null, this)

            this.scene.physics.add.collider(this.balle, this.scene.shield, function () {
                console.log('toucheShieldd');
                this.scene.physics.moveTo(this.balle,this.sprite.x,this.sprite.y + this.rand,200);
                console.log(this.rand)
                this.scene.swordHit.play();


            })
            this.scene.physics.add.collider(this.balle, this.sprite, function () {
                console.log('toucheAI');
                this.balle.destroy(true);
                this.sprite.setVisible(false);
                this.sprite.disableBody();




            })
        }
    }



}