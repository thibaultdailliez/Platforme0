class Score  {
    constructor(Tableau1){
        let me = this
        this.scene= Tableau1
        this.balle = this.scene.physics.add.sprite(this.scene.ai2.x, this.scene.ai2.y, 'balle').setOrigin(0, 0);
        this.balle.setDisplaySize(5,5);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.body.setMaxVelocityX(800);
        this.balle.body.setMaxVelocityY(700);
        this.balle.body.setAllowGravity(false)

        this.scene.physics.moveToObject(this.balle, this.scene.player, 400);
        this.scene.physics.add.collider(this.balle, this.scene.player, function () {
            console.log('touchePerso');
            me.balle.destroy(true);
            me.scene.player.x = me.scene.currentSaveX;
            me.scene.player.y = me.scene.currentSaveY;

        })
        this.scene.physics.add.collider(this.balle, this.scene.shield, function () {
            console.log('toucheShieldd');
            me.balle.setVelocityY = - me.balle.body.velocity.y;


        })
        this.scene.physics.add.collider(this.balle, this.scene.ai2, function () {
            console.log('toucheAI');
            me.balle.destroy(true);
            me.scene.ai2.setVisible(false);
            me.scene.ai2.disableBody();
            me.scene.aiDeath = true;

        })


    }