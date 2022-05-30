class Scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('door', 'assets/images/door.png');
        this.load.image('key', 'assets/images/key.png');
        this.load.image('key', 'assets/images/key.png');
        this.load.image('ladder', 'assets/images/ladder.png');
        this.load.image('ennemy', 'assets/images/Ennemy.png');
        // At last image must be loaded with its JSON
        //this.load.atlas('player', 'assets/images/kenney_player.png','assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('tiles_asset', 'assets/tilesets/asset.png');
        this.load.image('tiles_zazaz', 'assets/tilesets/zazaz.png');
        this.load.image('backFond', 'assets/tilesets/fond.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/levelTry.json');

        this.load.image('grenouille','assets/images/vf2.png');
        this.load.image('Arme1','assets/images/square.png');
        this.load.image('shield','assets/images/shield.png' );
        this.load.image('save', 'assets/images/Save.png');
        //sounds

        this.load.audio('song_sword','assets/sounds/song_sword.mp3');
        this.load.audio('Hit','assets/sounds/sword_hit.mp3');
        this.load.audio('HitRobo','assets/sounds/roboHit.mp3');

        // idel
        //this.load.atlas('player', 'assets/images/anim_player.png','assets/images/anim_player_atlas.json');
        this.load.spritesheet('idle', 'assets/images/idle.png', { frameWidth: 383, frameHeight: 505 });
        this.load.spritesheet('run', 'assets/images/run.png', { frameWidth: 383, frameHeight: 505 });
        this.load.spritesheet('couprl', 'assets/images/couprl.png', { frameWidth: 383, frameHeight: 505 });
        this.load.spritesheet('couph', 'assets/images/couph.png', { frameWidth: 383, frameHeight: 505 });

        //particul
        this.load.image('feu', 'assets/images/feu.png');
        this.load.image('feu2', 'assets/images/feu2.png');


    }



    create() {

        let me=this;
        this.gauche = true;
        this.touchP = false;
        this.AOn = false;
        // sounds
        this.sword = this.sound.add('song_sword');
        this.swordHit = this.sound.add('Hit');
        this.roboHit = this.sound.add('HitRobo');






        /**PRESETS**/
        //BG / Map / Player with anim
        const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('project_platformer', 'tiles');
        const asset = map.addTilesetImage('asset', 'tiles_asset')
        const zazaz = map.addTilesetImage('zazaz', 'tiles_zazaz');
        const backfond = map.addTilesetImage('fond', 'backFond');

        this.CP5fond = map.createLayer('P5fond', backfond,0,0);
        this.CP3 = map.createLayer('P3', zazaz,0,140);
        this.Herbe = map.createLayer('herbe', zazaz,0,140);
        this.Respawn = map.createLayer('respawn', asset,0,160);
        this.CP2 = map.createLayer('P2sol', asset,0,140);

        this.player = new Player(this);
        this.CPporte = map.createLayer('Pporte', asset,0,100);
        this.CP1 = map.createLayer('P1', asset,0,100);


        //platforms.setCollisionByExclusion(-1, true);

        this.savesX = this.player.player.x;
        this.savesY = this.player.player.y;


        //Save
        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y  - save.height + 120,).setOrigin(0);
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

        this.shield = this.physics.add.sprite(200, 100,'shield').setOrigin(0, 0);
        this.shield.body.setSize(20,200);
        this.shield.body.setAllowGravity(false);
        this.shield.setFlipX(true);
        this.shield.setVisible(false);
        this.shield.setImmovable(true);
        this.shield.body.setEnable(false);

        this.shield2 = this.physics.add.sprite(400, 100,'shield').setOrigin(0, 0);
        this.shield2.body.setSize(200,20);
        this.shield2.body.setAllowGravity(false);
        this.shield2.setVisible(false);
        this.shield2.setImmovable(true);
        this.shield2.body.setEnable(false);





        // particul
        this.feuParticles = this.add.particles('feu');
        this.feuParticles.createEmitter({
            speed: 100,
            lifespan: 1500,
            quantity: 100,
            //gravityY: 500,
            scale: {start: 0.5, end: 1},
            alpha: { start: 1, end: 0 },
            angle: { min: -100, max: -80 },
           // blendMode: 'ADD',
            on: false
        });

        this.feuFX = {

            frequency:100,
            lifespan: 2000,
            quantity:10,
            x:{min:-20,max:20},
            y:{min:-10,max:0},
            rotate: {min:-10,max:10},
            speedX: { min: -20, max: 20 },
            speedY: { min: -100, max: -10 },
            scale: {start: 0, end: 1},
            alpha: { start: 1, end: 0 },
           // blendMode: Phaser.BlendModes.ADD,
        };
        this.feuParticles = this.add.particles('feu2');
        this.feuParticles.createEmitter({
            speed: 100,
            lifespan: 1500,
            quantity: 100,
            //gravityY: 500,
            scale: {start: 0.5, end: 1},
            alpha: { start: 1, end: 0 },
            angle: { min: -100, max: -80 },
            blendMode: 'ADD',
            on: false
        });

        this.feuFX2 = {

            frequency:100,
            lifespan: 2000,
            quantity:10,
            x:{min:-20,max:10},
            y:{min:-10,max:0},
            rotate: {min:-10,max:10},
            speedX: { min: -20, max: 20 },
            speedY: { min: -100, max: -10 },
            scale: {start: 0, end: 1},
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
        };




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

        this.Platformai = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Platform').objects.forEach((platformai) => {
            const PlaformAiSprite = this.physics.add.sprite(platformai.x+(platformai.width*0.5),platformai.y + (platformai.height*0.5) + 140).setSize(platformai.width,platformai.height);
            this.Platformai.add(PlaformAiSprite);
        });









        this.projectiles = this.add.group();



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


        //bernards
        /*
        this.bernards = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

         */
        map.getObjectLayer('bernards').objects.forEach((bernard) => {
            let monBernard=new Bernard(this,bernard.x,bernard.y);
            //const bernardSprite = this.bernards.create(bernard.x, bernard.y).setOrigin(0);
            //bernardSprite.body.setSize(enemy.width, enemy.height).setOffset(0, 0);

        });



        //Collider player
        this.physics.add.collider(this.player.player, this.sol);
        this.physics.add.collider(this.player.player, this.enemy, this.playerHit, null, this);
        this.physics.add.overlap(this.player.player, this.saves, this.Save, null, this);



        this.initKeyboard();

        this.cameras.main.startFollow(this.player.player, true, 0.05, 0.05, -350,100);




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
        this.emitFeu = this.add.particles('feu'); //On charge les particules à appliquer au layer
        this.emitFeu.createEmitter(this.feuFX); //On crée l'émetteur
        this.emitFeu.x = save.x +30;
        this.emitFeu.y = save.y +5;
        this.emitFeu2 = this.add.particles('feu2'); //On charge les particules à appliquer au layer
        this.emitFeu2.createEmitter(this.feuFX2); //On crée l'émetteur
        this.emitFeu2.x = save.x +30;
        this.emitFeu2.y = save.y +15;

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
                    me.rightDown = true;
                    me.player.Right();

                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche = true;
                    me.leftDown = true;
                    me.player.Left();
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.player.Jump();
                    break;


                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.AOn = true;
                    me.sword.play();
                    me.player.SwordRL();

                    break;

                case Phaser.Input.Keyboard.KeyCodes.L:
                    me.AOn = true;
                    me.sword.play();
                    me.UpOn = true;
                    me.player.SwordUp();

                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.player.player.setVelocityX(0);
                    me.rightDown = false;
                    if (me.player.player.body.onFloor()) {
                        me.player.player.play('idel');
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.player.player.setVelocityX(0);
                    me.leftDown = false;
                    if (me.player.player.body.onFloor()) {
                       me.player.player.play('idel');
                   }
                   break;
               case Phaser.Input.Keyboard.KeyCodes.SPACE:
                   me.dejaAppuye = false;
                   break;

                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.AOn = false;
                    me.shield.setVisible(false)
                    me.shield.body.setEnable(false);
                    break;

                case Phaser.Input.Keyboard.KeyCodes.L:
                    me.AOn = false;
                    me.UpOn = false;
                    me.shield2.setVisible(false)
                    me.shield2.body.setEnable(false);
                    break;
            }
        });
    }

    disparait(obstacle){

        obstacle.body.setEnable(false);
        obstacle.setVisible(false);
    }D


    update()
    {

        Bernard.tousLesBernards.forEach(bernard=>{
            bernard.update();
        });

       /* if (this.gauche == true ){
            this.shield.x = this.player.player.x -250 ;
            this.shield.y = this.player.player.y -200;
        }

        else {
            this.shield.x = this.player.player.x +150 ;
            this.shield.y = this.player.player.y -200;

        }
        if (this.UpOn == true ){
            this.shield2.x = this.player.player.x  ;
            this.shield2.y = this.player.player.y -400;
        }

        if (this.rightDown && this.AOn){
            this.player.player.setVelocityX(0);
            this.player.player.setVelocityY(0);
        }

        if (this.leftDown && this.AOn){
            this.player.player.setVelocityX(0);
            this.player.player.setVelocityY(0);
        }
*/




        








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













        /**CONDITIONS D'ANIMATIONS**/
        if (this.player.player.body.velocity.x === 0 && this.player.player.body.onFloor())
        {

        }



        //


    }


}
