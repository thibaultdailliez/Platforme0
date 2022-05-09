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
        this.tireD = false;
        this.gauche = true;
        this.aiDeath = false;
        // save
        this.currentSaveX = 100;
        this.currentSaveY = 300;

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

        //Save
        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y  - save.height, 'save').setOrigin(0);
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
        this.shield.setDisplaySize(25,60);
        this.shield.body.setAllowGravity(false);
        this.shield.setFlipX(true);
        this.shield.setVisible(false);
        this.shield.setImmovable(true);
        this.shield.body.setEnable(false);


        // IA qui Tire
        this.ai2 = this.physics.add.sprite(1200, 215, 'grenouille').setOrigin(0, 0);
        this.ai2.setDisplaySize(50,100);
        this.ai2.body.setAllowGravity(true);
        this.ai2.setVisible(true);

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





        this.physics.add.collider(this.ai2, this.sol);



        this.projectiles = this.add.group();


        this.time.addEvent({ delay: 500, callback: this.tir, callbackScope: this,loop : true });

        /**GAMEOBJECTS**/

        //ECHELLE
        this.ladder = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Ladder').objects.forEach((ladder) => {
            // Add new spikes to our sprite group
            const ladderSprite = this.ladder.create(ladder.x,ladder.y + 100 - ladder.height, 'ladder').setOrigin(0);
            ladderSprite.body.setSize(ladder.width-50, ladder.height).setOffset(0, 0);
        });

        //ENNEMIS
        this.enemy = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Enemy').objects.forEach((enemy) => {
            const enemySprite = this.enemy.create(enemy.x, enemy.y +100 - enemy.height, 'enemy').setOrigin(0);
            enemySprite.body.setSize(enemy.width, enemy.height).setOffset(0, 0);
        });



        //Collider player
        this.physics.add.collider(this.player.player, this.sol);
        this.physics.add.collider(this.player.player, this.enemy, this.playerHit, null, this);
        this.physics.add.overlap(this.player.player,this.ladder, this.climb.bind(this), null, this);





        /**COLLIDERS AND OVERLAPS FOR INTERACTIONS**/

        //this.physics.add.collider(this.player, this.ladder, this.playerHit, null, this);



        /**CAMERA POINTING AND VISUAL POLISH**/






        this.initKeyboard();
        /**CREER UN OVERLAP OU UN COLLIDER QUI ACTIVE UN BOOLEEN AU CONTACT D'UNE ECHELLE ET LE DESACTIVE AU CONTACT DES PLATEFORMES**/

        this.cameras.main.startFollow(this.player.player, true, 0.05, 0.03, -200,150 );

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
        this.player.player.setX(50);
        this.player.player.setY(300);
        this.player.player.play('idel', true);
        let tw = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }

    tir(){

        if (this.tireD === true){
            this.balle = new Balle(this);

        }


    }

    IaGestion2(){
        this.dist2 = Phaser.Math.Distance.BetweenPoints(this.player.player,this.ai2);

        if (this.dist2 <= 400 && this.aiDeath === false) {
            this.tireD = true
            console.log("tire")

        }
        else{
            this.tireD = false;

        }

    }


    climb(player, ladder){
        this.player.player.onLadder = true;
    }

    sauvegarde(player, saves){
        console.log("current", this.currentSaveX, this.currentSaveY)
        this.currentSaveX = player.player.x
        this.currentSaveY = player.player.y
        saves.body.enable = false;
        this.currentKey = player.player.key
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
                    me.rightLad = true;
                    me.rightDown=true;
                    me.player.player.setVelocityX(300);
                    if (me.player.player.body.onFloor()) {
                        me.player.player.play('walk', true);
                    }

                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche = true;
                    me.leftLad = true;
                    me.leftDown=true;
                    me.player.player.setVelocityX(-300);
                    if (me.player.player.body.onFloor()) {
                        me.player.player.play('walk', true);
                    }

                    break;
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.upLad = true;
                    //me.player.play('jump', true);//FAIS RIEN
                    if (me.dejaAppuye) { //SI LA VARIABLE DEJAAPPUYE EST VRAI
                    }
                    else { //SINON
                        me.dejaAppuye = true;//POUR LA PROCHAINE FOIS
                        if (me.player.player.body.onFloor()){ // SI LE JOUEUR TOUCHE LE SOL
                            me.player.player.setVelocityY(-800); //LE PERSONNAGE VA A UNE VITESSE DE 330 VERS LE HAUT
                            me.doubleJump = 1; //LA VARIABLE DOUBLEJUMP A 1 POUR POUVOIR AVOIR LE DOUBLE SAUT
                        }
                        if (me.doubleJump === 1 && !me.player.player.body.onFloor()) { //SI LA VARIABLE DOUBLESAUT EST A 1 ET LE JOUEUR NE TOUCHE PAS LE SOL
                            if(me.gauche === true){
                                me.player.player.x = me.player.player.x -100;
                            }
                            else{
                                me.player.player.x = me.player.player.x +100;
                            }
                            me.player.player.setVelocityY(-300); //LE PERSONNAGE VA A UNE VITESSE DE 330 VERS LE HAUT
                            me.doubleJump = 0; //LA VARIABLE DOUBLEJUMP A 0 POUR NE PLUS POUVOIR AVOIR LE DOUBLE SAUT
                        }
                    }
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
                    if (me.gauche == true ){
                        me.shield.setVisible(true);
                        me.shield.body.setEnable(true);
                    }
                    else{
                        me.shield.setVisible(true);
                        me.shield.body.setEnable(true);
                    }
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.rightLad = false;
                    me.rightDown= false;
                    me.player.player.setVelocityX(0);
                    if (me.player.player.body.onFloor()) {
                        me.player.player.play('idel');
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.leftLad = false;
                    me.leftDown= false;
                    me.player.player.setVelocityX(0);
                    if (me.player.player.body.onFloor()) {
                       me.player.player.play('idel');
                   }
                   break;
               case Phaser.Input.Keyboard.KeyCodes.SPACE:
                   me.upLad = false;
                   me.dejaAppuye = false;
                   me.player.player.play('idel', false);
                   if (me.player.player.body.onFloor()) {
                       me.player.player.play('idel');
                   }
                   break;
               case Phaser.Input.Keyboard.KeyCodes.S:
                   me.downLad = false;
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

        this.IaGestion2()

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
            this.shield.x = this.player.player.x -55    ;
            this.shield.y = this.player.player.y -40    ;
        }

        else {
            this.shield.setFlipX(false);
            this.shield.x = this.player.player.x + 30 ;
            this.shield.y = this.player.player.y -40  ;
        }

        /**CONDITIONS D'ANIMATIONS**/
        //Si perso bouge à droite son sprite est vers la droite
        if (this.player.player.body.velocity.x > 0)
        {
            //this.camBox.x += 6;
            this.player.player.setFlipX(false);
        }

        // Dans le cas contraire il est vers la gauche
        else if (this.player.player.body.velocity.x < 0)
        {
            //this.camBox.x -= 6;
            this.player.player.setFlipX(true);
        }
        //S'il ne bouge pas et qu'il est au sol
        else if (this.player.player.body.velocity.x === 0 && this.player.player.body.onFloor())
        {
            //this.camBox.x = this.player.x;
            //this.player.play('idle', true);
        }

        /**CONDITIONS POUR GRIMPER**/
        if(this.player.player.onLadder)
        {
            this.player.player.onLadder = false;
            if (this.upLad)
            {
                this.player.player.setVelocityY(-400);
                this.player.player.body.setAllowGravity(true);
            }
            else if (this.downLad)
            {
                this.player.player.setVelocityY(400);
                this.player.player.body.setAllowGravity(true);
            }
            else {
                this.player.player.setVelocityY(0);
                this.player.player.body.setAllowGravity(false);

            }

            if (!this.player.player.onLadder){
                if (this.downLad || this.upLad || this.rightLad || this.leftLad){
                    this.player.player.body.setAllowGravity(true);
                }
            }


        }
        //


    }


}
