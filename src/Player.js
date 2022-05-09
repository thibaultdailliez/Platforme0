class Player {
    constructor(Tableau1){
        let me = this
        this.scene= Tableau1
        this.player = this.scene.physics.add.sprite(100, 600, 'player');
        this.player.scale=0.6
        //Taille de la hitbox du Player
        this.player.body.setSize(this.player.width-65, this.player.height-20).setOffset(40, 18);
        //this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.player.body.setAllowGravity(true);
        //this.physics.add.collider(this.player, platforms);.0

        //ANIMATION


        this.scene.anims.create({
            key: 'idel',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'idel',
                start: 1,
                end: 8,
            }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'run-',
                start: 1,
                end: 6,
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


    }





}