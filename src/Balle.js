class Balle  {
    constructor(Tableau1){
        let me = this
        this.rand =  Math.random() * (100 - (-100)) + (-100);
        this.respawnAi=false;
        this.scene= Tableau1
        this.balle = this.scene.physics.add.sprite(this.scene.ai.ai.x, this.scene.ai.ai.y, 'balle').setOrigin(0, 0);
        this.balle.setDisplaySize(5,5);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.body.setMaxVelocityX(800);
        this.balle.body.setMaxVelocityY(700);
        this.balle.body.setAllowGravity(false)

        this.scene.physics.moveToObject(this.balle, this.scene.player.player, 400);
        this.scene.physics.add.overlap(this.balle, this.scene.player.player, function () {
            console.log('touchePerso');
            me.balle.destroy(true);
            me.scene.player.player.x = me.scene.currentSaveX;
            me.scene.player.player.y = me.scene.currentSaveY;


        })
        this.scene.physics.add.collider(this.balle, this.scene.shield, function () {
            console.log('toucheShieldd');
            me.scene.physics.moveTo(me.balle,me.scene.ai.ai.x,me.scene.ai.ai.y + me.rand,200);
            console.log(me.rand)
            me.scene.swordHit.play();


        })
        this.scene.physics.add.collider(this.balle, this.scene.ai.ai, function () {
            console.log('toucheAI');
            me.balle.destroy(true);
            me.scene.ai.ai.setVisible(false);
            me.scene.ai.ai.disableBody();
            me.scene.ai.aiDeath = true;


        })


    }


    update(){
        console.log("update")
        let me = this;


        if(this.balle.y < 0 ){
            me.balle.destroy();
            console.log("detruit")

        }
        if(this.balle.x <  0 ){
            me.balle.destroy()
            console.log("detruit")
        }
        if(this.balle.y > 300){
            me.balle.destroy();
            console.log("detruit")
        }
        if(this.balle.x > 1000 ){
            me.balle.destroy()
            console.log("detruit")
        }

    }
}