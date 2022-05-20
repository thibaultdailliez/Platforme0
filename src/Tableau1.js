class Tableau1 extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('door', 'assets/images/door.png');
        this.load.image('key', 'assets/images/key.png');
        this.load.image('ladder', 'assets/images/ladder.png');
        this.load.image('enemy', 'assets/images/enemy.png');
        // At last image must be loaded with its JSON
        //this.load.atlas('player', 'assets/images/kenney_player.png','assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/levelTry.json');

        this.load.image('grenouille','assets/images/vf2.png');
        this.load.image('Arme1','assets/images/square.png');
        this.load.image('shield','assets/images/shield.png' );
        this.load.image('save', 'assets/images/Save.png');
        this.load.audio('song_sword','assets/sounds/song_sword.mp3');
        this.load.audio('Hit','assets/sounds/sword_hit.mp3');
        // idel
        this.load.atlas('player', 'assets/images/player_anim.png','assets/images/player_anim_atlas.json');
        this.load.image('AnimI1', 'assets/anim/AnimI1.png');
        this.load.image('AnimI2', 'assets/anim/AnimI2.png');
        this.load.image('AnimI3', 'assets/anim/AnimI3.png');
        this.load.image('AnimI4', 'assets/anim/AnimI4.png');
        this.load.image('AnimI5', 'assets/anim/AnimI5.png');
        this.load.image('AnimI6', 'assets/anim/AnimI6.png');
        this.load.image('AnimI7', 'assets/anim/AnimI7.png');
        this.load.image('AnimI8', 'assets/anim/AnimI8.png');

    }



    create() {

        let me=this;
        this.gauche = true;
        this.touchP = false;
        // sounds
        this.sword = this.sound.add('song_sword');
        this.swordHit = this.sound.add('Hit');






        /**PRESETS**/
        //BG / Map / Player with anim
        const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('project_platformer', 'tiles');
        const platforms = map.createStaticLayer('Platforms', tileset, 0, 100).setOrigin(0,0);
        //platforms.setCollisionByExclusion(-1, true);
        this.player = new Player(this);
        this.savesX = this.player.player.x;
        this.savesY = this.player.player.y;


        //Save
        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y  - save.height + 100, 'save').setOrigin(0);
        });

        /*/ TEXT
        this.dialogs = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('dialog').objects.forEach((dialogs) => {
            // On ajoute la boite de dialogue via un pnj
            const dialogSprite = this.dialogs.create(200, 800 - dialogs.height, 'player').setOrigin(0);
        });
        this.mytxt = this.add.text(150,250,"",{font: "20px", fill:"#00000"}).setOrigin(0,0).setScrollFactor(0);;
// on ajoute une collision a notre NPC qui nous empêche de passer, on peut faire de même avec un asset
        this.physics.add.collider(this.player, this.dialogs, text,  null,this)
//
        this.lock=0

        */










        //idel creat




        // Création du bouclier

        this.shield = this.physics.add.sprite(200, 0,'shield').setOrigin(0, 0);
        this.shield.setDisplaySize(10,100);
        this.shield.body.setAllowGravity(false);
        this.shield.setFlipX(true);
        this.shield.setVisible(false);
        this.shield.setImmovable(true);
        this.shield.body.setEnable(false);


        // IA qui Tire




        // Projectille



        //COLLISIONS
        this.sol = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Sol').objects.forEach((sol) => {
            const solSprite = this.physics.add.sprite(sol.x+(sol.width*0.5),sol.y + (sol.height*0.5) + 100).setSize(sol.width,sol.height);
            this.sol.add(solSprite);
        });

        this.PlatformCam = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Platform').objects.forEach((platformcam) => {
            const PlaformCamSprite = this.physics.add.sprite(platformcam.x+(platformcam.width*0.5),platformcam.y + (platformcam.height*0.5) + 100).setSize(platformcam.width,platformcam.height);
            this.PlatformCam.add(PlaformCamSprite);
        });









        this.projectiles = this.add.group();


        this.time.addEvent({ delay: 500, callback: this.tir, callbackScope: this,loop : true });

        /**GAMEOBJECTS**/

        //ECHELLE
        this.ladder = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });


        //ENNEMIS
        this.enemy = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Enemy').objects.forEach((enemy) => {
            const enemySprite = this.enemy.create(enemy.x, enemy.y - enemy.height + 100).setOrigin(0);
            enemySprite.body.setSize(enemy.width, enemy.height).setOffset(0, 0);
        });



        //Collider player
        this.physics.add.collider(this.player.player, this.sol, this.SolCamera, null, this);
        this.physics.add.collider(this.player.player, this.PlatformCam, this.PlatformCamera, null, this);
        this.physics.add.collider(this.player.player, this.enemy, this.playerHit, null, this);
        this.physics.add.overlap(this.player.player, this.saves, this.Save, null, this);


        this.initKeyboard();

        this.cameras.main.startFollow(this.player.player, true, 0.1, 0.1, -350,150 );
        this.ai = new Ai(this);
        this.ai2 = new Ai(this);
        this.ai2.ai.x = 500;
        this.balle = new Balle(this);

        this.ai.tir(this.ai.ai)
    }
    /*
    text(player,dialog){
        let me = this
        if(this.lock===0){  // si lock ===O on lance le dialogue si dessus
            me.mytxt.setText("[Robot]: Si je te dis abeille ?\nA- C'est beau \nB- C'est bon   \nC- Elle plane")
            me.lock=1 // lock = 1 donc le dialogue ne lancera plus solo
        }
        // quand j'appuie sur A je réponds à la question et je peux passer
        this.input.keyboard.on('keydown-A', function () {
            me.mytxt.setText("[Robot]: Dépêche toi de passer ou je te marrave")
            dialog.body.enable=false // Le collider de mon NPC disparait et me permet de passer

        }, this);

        // quand j'appuie sur B je réponds à la question et je ne peux  pas passer
        this.input.keyboard.on('keydown-B', function () {
            me.mytxt.setText("[Robot]: C'est ta gueule que je vais manger tu \nva voir ! Donc une abeille c'est ?\nA- C'est beau \nC- Elle plane")
            dialog.body.enable=true // Le collider de mon NPC reste toujours actif et bloque le passage

        }, this);

        thisinput.keyboard.on('keydown-C', function () {
            me.mytxt.setText("[Robot]: C'est toi qui plane l'ami,donc l'abeille \nest ?\nA- C'est beau \nB- C'est bon")
            dialog.body.enable=true // Le collider de mon NPC reste toujours actif et bloque le passage

        }, this);


    }
    */
    playerHit(player, enemy) {
        this.player.player.setVelocity(0, 0);
        this.player.player.x = this.savesX;
        this.player.player.y = this.savesY;
        this.player.player.play('idel', true);
        let tw = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }
    Save(player, save){
        this.savesX = this.player.player.x;
        this.savesY = this.player.player.y;
        console.log("save", this.savesX, this.savesY);
        save.visible = false;
        save.body.enable = false;

    }
    PlatformCamera(){
        this.touchP = true;

    }
   SolCamera(){
       this.touchP = false;
    }
    SwitchCam(){
        if(this.touchP == true){
            this.cameras.main.startFollow(this.player.player, true, 0.01, 0.01, -350,-85 );

        }
        else {
            this.cameras.main.startFollow(this.player.player, true, 0.1, 0.1, -350,150 );
        }
    }


    initKeyboard()
     {
        let me = this;

        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.gauche = false;
                    me.player.Right();

                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche = true;
                    me.player.Left();
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.upLad = true;
                    me.player.Jump();
                    break;
                case Phaser.Input.Keyboard.KeyCodes.S:
                    if (me.leftDown){
                        me.player.player.setVelocityX(-100);//LE PERSONNAGE VA A UNE VITESSE DE <A UNE VITESSE DE 260 A GAUCHE
                    }
                    else if (me.rightDown){
                        me.player.player.setVelocityX(100);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 260 A DROITE
                    }
                    if (me.player.player.body.onFloor()) {
                        me.player.player.body.setSize(me.player.width-40, me.player.height-60).setOffset(20, 30);
                    }
                    me.downLad = true;

                    break;

                case Phaser.Input.Keyboard.KeyCodes.F:
                    me.sword.play();
                    me.player.SwordRL();

                    break;

                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.UpOn = true;
                    me.sword.play();
                    me.player.SwordUp();

                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.player.player.setVelocityX(0);
                    if (me.player.player.body.onFloor()) {
                        me.player.player.play('idel');
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.player.player.setVelocityX(0);
                    if (me.player.player.body.onFloor()) {
                       me.player.player.play('idel');
                   }
                   break;
               case Phaser.Input.Keyboard.KeyCodes.SPACE:
                   me.dejaAppuye = false;
                   break;
               case Phaser.Input.Keyboard.KeyCodes.S:
                   me.player.player.y = me.player.player.y - 27;
                   me.player.player.body.setSize(me.player.player.width-40, me.player.player.height-30).setOffset(20, 30);
                   /*if (me.player.body.onFloor()) {
                       me.player.y = me.player.y - 27;
                       me.player.body.setSize(me.player.width-40, me.player.height-30).setOffset(20, 30);
                   }*/
                    break;

                case Phaser.Input.Keyboard.KeyCodes.F:
                    me.shield.setVisible(false)
                    me.shield.body.setEnable(false);
                    break;

                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.UpOn = false;
                    me.shield.setVisible(false)
                    me.shield.body.setEnable(false);
                    break;
            }
        });
    }

    disparait(obstacle){

        obstacle.body.setEnable(false);
        obstacle.setVisible(false);
    }


    update()
    {
        for(var i = 0; i < this.projectiles.getChildren().length; i++){
            var tir = this.projectiles.getChildren()[i];
            tir.update();
        }





        //this.ai.IaGestion2(this.ai.ai,this.ai.dist)


        // this.ai.IaGestion2(this.ai2.ai,this.ai2.dist)
        // this.ai.tir()

        /*
        if(this.respawnAi===true){
            this.ai2 = this.physics.add.sprite(1200, 215, 'grenouille').setOrigin(0, 0);
            this.ai2.setDisplaySize(50,75);
            this.ai2.body.setAllowGravity(true);
            this.ai2.setVisible(true);
            this.physics.add.collider(this.ai2, this.sol);
            this.scene.aiDeath = false;
            this.respawnAi=false;

        } */







        // on tp constament les shield au joueur

        if (this.gauche == true ){
            this.shield.setFlipX(true);
            this.shield.x = this.player.player.x -110    ;
            this.shield.y = this.player.player.y -100    ;
        }

        else {
            this.shield.setFlipX(false);
            this.shield.x = this.player.player.x + 110 ;
            this.shield.y = this.player.player.y -100  ;
        }

        if (this.UpOn == true ){
            this.shield.x = this.player.player.x    ;
            this.shield.y = this.player.player.y -200  ;
        }

        else {

        }

        /**CONDITIONS D'ANIMATIONS**/
        if (this.player.player.body.velocity.x === 0 && this.player.player.body.onFloor())
        {

        }



        //


    }


}
