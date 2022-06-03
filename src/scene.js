class Scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('door', 'assets/images/door.png');
        this.load.image('key', 'assets/images/key.png');
        this.load.image('key', 'assets/images/key.png');
        this.load.image('ladder', 'assets/images/ladder.png');
        this.load.image('Enemy', 'assets/images/Ennemy.png');
        this.load.image('turret', 'assets/images/turret.png');
        this.load.image('Boss', 'assets/images/boss.png');
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
        this.load.spritesheet('idle', 'assets/images/idlev2.png', { frameWidth: 691.5, frameHeight: 505 });
        this.load.spritesheet('run', 'assets/images/runv2.png', { frameWidth: 691.5, frameHeight: 505 });
        this.load.spritesheet('couprl', 'assets/images/couprlv2.png', { frameWidth: 691.5, frameHeight: 505 });
        this.load.spritesheet('couph', 'assets/images/couphv2.png', { frameWidth: 691.5, frameHeight: 505 });
        this.load.spritesheet('roboton', 'assets/images/AnimROBOon.png', { frameWidth: 252 , frameHeight: 462 });

        //particul
        this.load.image('feu', 'assets/images/feu.png');
        this.load.image('feu2', 'assets/images/feu2.png');
        this.load.image('feu3', 'assets/images/feu3.png');
        this.load.image('feu4', 'assets/images/feu4.png');
        this.load.image('robotMort', 'assets/images/robothit.png');
        this.load.image('shieldhit', 'assets/images/shieldhit.png');
        this.load.image('balleFX', 'assets/images/balleFX.png');
        this.load.image('tirerobot', 'assets/images/tirerobot.png');

        //touche
        this.load.image('direction', 'assets/images/direction.png');
        this.load.image('attaque', 'assets/images/attaque.png');
        this.load.image('saut', 'assets/images/saut.png');
        this.load.spritesheet('fleche', 'assets/images/fleche.png', { frameWidth: 41, frameHeight: 23 });
        this.load.spritesheet('ppp', 'assets/images/epee.png', { frameWidth: 65, frameHeight: 61 });


    }



    create() {
        this.scene.launch('SceneAth');

        let me=this;
        this.gauche = true;
        this.touchP = false;
        this.AOn = false;
        // sounds
        this.sword = this.sound.add('song_sword');
        this.swordHit = this.sound.add('Hit');
        this.roboHit = this.sound.add('HitRobo');


        //animation touche
        this.anims.create({
            key: 'flecheee',
            frames: this.anims.generateFrameNumbers('fleche', { start: 0, end: 4 }),//CE SONT LES IMAGES 0/1/2/3 QUI SONT JOUEES
            frameRate: 6,//NOMBRE D'IMAGES JOUEES
            repeat: -1//REPETITION INFINIE
        });

        this.anims.create({
            key: 'pppp',
            frames: this.anims.generateFrameNumbers('ppp', { start: 0, end: 3 }),//CE SONT LES IMAGES 0/1/2/3 QUI SONT JOUEES
            frameRate: 10,//NOMBRE D'IMAGES JOUEES
            repeat: -1//REPETITION INFINIE
        });

        // particul
        this.feuParticles = this.add.particles('feu2');
        this.feuParticles.createEmitter({
            speed: 40,
            lifespan: 750,
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
            lifespan: 1000,
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
        this.feuParticles = this.add.particles('feu');
        this.feuParticles.createEmitter({
            speed: 40,
            lifespan: 750,
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
            lifespan: 1000,
            quantity:10,
            x:{min:-20,max:10},
            y:{min:-10,max:0},
            flipY: true,
            rotate: {min:-10,max:10},
            speedX: { min: -20, max: 20 },
            speedY: { min: -100, max: -10 },
            scale: {start: 0, end: 1},
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
        };

        this.feuParticles = this.add.particles('feu4');
        this.feuParticles.createEmitter({
            speed: 40,
            lifespan: 750,
            quantity: 100,
            //gravityY: 500,
            scale: {start: 0.5, end: 1},
            alpha: { start: 1, end: 0 },
            angle: { min: -100, max: -80 },
            // blendMode: 'ADD',
            on: true
        });

        this.feuFX4 = {

            frequency:100,
            lifespan: 1000,
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
        this.feuParticles = this.add.particles('feu3');
        this.feuParticles.createEmitter({
            speed: 40,
            lifespan: 750,
            quantity: 100,
            //gravityY: 500,
            scale: {start: 0.5, end: 1},
            alpha: { start: 1, end: 0 },
            angle: { min: -100, max: -80 },
            blendMode: 'ADD',
            on: false

        });

        this.feuFX3 = {

            frequency:100,
            lifespan: 1000,
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
        this.CP4 = map.createLayer('P4', zazaz,0,140);
        this.CP3 = map.createLayer('P3', zazaz,0,140);
        this.Herbe = map.createLayer('herbe', zazaz,0,140);
        this.Respawn = map.createLayer('respawn', asset,0,160);
        this.CP2 = map.createLayer('P2sol', asset,0,140);
        //touche
        this.directions = this.physics.add.sprite(200, 600,'direction').setOrigin(0, 0);
        this.directions.body.setAllowGravity(false);
        this.attaques = this.physics.add.sprite(1200, 540,'attaque').setOrigin(0, 0);
        this.attaques.body.setAllowGravity(false);
        this.sauts = this.physics.add.sprite(2400, 540,'saut').setOrigin(0, 0);
        this.sauts.body.setAllowGravity(false);
        this.fleche = this.physics.add.sprite(1385, 565,'fleche').setOrigin(0, 0);
        this.fleche.scale = 0.8;
        this.fleche.body.setAllowGravity(false);
        this.fleche.play('flecheee')
        this.flecheV = this.physics.add.sprite(1250, 585,'fleche').setOrigin(0, 0);
        this.flecheV.scale = 0.8;
        this.flecheV.angle = -90
        this.flecheV.body.setAllowGravity(false);
        this.flecheV.play('flecheee')
        this.ppp = this.physics.add.sprite(1375, 605,'ppp').setOrigin(0, 0);
        this.ppp.scale = 0.8;
        this.ppp.body.setAllowGravity(false);
        this.ppp.play('pppp')
        this.ppp2 = this.physics.add.sprite(1240, 605,'ppp').setOrigin(0, 0);
        this.ppp2.scale = 0.8;
        this.ppp2.body.setAllowGravity(false);
        this.ppp2.play('pppp')
        //fin Touche



        this.player = new Player(this);
        this.boss = new Boss(this);
        this.CPporte = map.createLayer('Pporte', asset,0,100);
        this.CP1 = map.createLayer('P1', asset,0,100);
//PARALLAXE
        this.CP4.setAlpha(0.5);
        this.CP4.scrollFactorX=0;
        this.CP3.scrollFactorX=0.4;
        this.CP2.scrollFactorX=1;
        this.CP1.scrollFactorX=1;
        this.CPporte.scrollFactorX=1;
        this.Herbe.scrollFactorX=1;
        this.Respawn.scrollFactorX=1;


        this.savesX = this.player.player.x;
        this.savesY = this.player.player.y;


        //Save
        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Save').objects.forEach((save) => {

            const saveSprite = this.saves.create(save.x, save.y  - save.height + 120,'save').setOrigin(0);
        });

        // Création du bouclier

        this.shield = this.physics.add.sprite(200, 100,'shield').setOrigin(0, 0);
        this.shield.body.setSize(200,180);
        this.shield.body.setAllowGravity(false);
        this.shield.setFlipX(true);
        this.shield.setVisible(false);
        this.shield.setImmovable(true);
        this.shield.body.setEnable(false);











        //Touche





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
            this.enemySprite = this.physics.add.sprite(enemy.x+(enemy.width*0.5), enemy.y+(enemy.height*0.5)).setSize(enemy.width, enemy.height);
            this.enemy.add(this.enemySprite)
        });


        map.getObjectLayer('Sol').objects.forEach((sol) => {
            const solSprite = this.physics.add.sprite(sol.x+(sol.width*0.5),sol.y + (sol.height*0.5) + 100).setSize(sol.width,sol.height);
            this.sol.add(solSprite);
        });
        this.victoire = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Victoire').objects.forEach((victoire) => {
            const victoireSprite = this.physics.add.sprite(victoire.x+(victoire.width*0.5),victoire.y + (victoire.height*0.5) + 100).setSize(victoire.width,victoire.height);
            this.victoire.add(victoireSprite);
        });
        map.getObjectLayer('bernards').objects.forEach((bernard) => {
            let monBernard=new Bernard(this,bernard.x+(bernard.width*0.5),bernard.y);
            //const bernardSprite = this.bernards.create(bernard.x, bernard.y).setOrigin(0);
            //bernardSprite.body.setSize(enemy.width, enemy.height).setOffset(0, 0);

        });





        //Collider player
        this.physics.add.collider(this.player.player, this.sol);
        this.physics.add.collider(this.player.player, this.enemy, this.playerHit, null, this);
        this.physics.add.overlap(this.player.player, this.saves, this.Save, null, this);
        this.physics.add.overlap(this.player.player, this.victoire, function () {
            me.scene.launch('SceneFin');
            console.log('fin')





        })
        this.initKeyboard();

        this.pointCamera = this.physics.add.sprite(0, 0);
        this.cameras.main.startFollow(this.pointCamera, true,1,1,0, 200);
        this.pointCamera.body.setAllowGravity(false);
        this.pointCamera.setImmovable(true);
        this.cameras.main.setRoundPixels(true);




    }

    playerHit(player, enemy) {
        this.player.player.setVelocityY(0);
        this.player.player.setVelocityX(0);
        this.player.player.x = this.savesX;
        this.player.player.y = this.savesY;
        this.player.player.play('idel', true);
        mort = mort + 1;
        score = score -100;
        console.log(this.mort,'death')
        console.log(this.score,'score')
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
        this.savesY = this.player.player.y -10;
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

                    break;

                case Phaser.Input.Keyboard.KeyCodes.L:
                    me.AOn = false;
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

        Bernard.tousLesBernards.forEach(bernard=>{
            bernard.update();
        });
        this.pointCamera.body.x = this.player.player.body.x + 350;
        this.pointCamera.body.y = this.player.player.body.y ;
        let offset=100;
        switch(true)
        {
            case this.player.player.body.velocity.y<0:
                offset=50;
                break;
            case this.player.player.body.velocity.y>0:
                offset=-50;
                break;

            default:
                offset=100
                break;

        }


        function lerp (start, end, amt=0.1){
            return (1-amt)*start+amt*end
        }




        this.cameras.main.followOffset.y=lerp(this.cameras.main.followOffset.y,offset,  0.01)






















        /**CONDITIONS D'ANIMATIONS**/
        if (this.player.player.body.velocity.x === 0 && this.player.player.body.onFloor())
        {

        }



        //


    }


}
