class Ai{
    constructor(Tableau1) {
        let me = this
        this.scene = Tableau1
        this.tireD = false;
        this.aiDeath = false;
        //
        this.ai = this.scene.physics.add.sprite(1700, 215, 'grenouille').setOrigin(0, 0);
        this.ai.setDisplaySize(50, 150);
        this.ai.body.setAllowGravity(true);
        this.ai.setVisible(true);

        this.dist = Phaser.Math.Distance.BetweenPoints(this.scene.player.player,this.ai);



        this.scene.physics.add.collider(this.ai, this.scene.sol);

        //
    }



        tir(ai){
            this.Reset = this.scene.time.addEvent({
                delay: 500,
                callback: ()=>{
                    if (this.IaGestion2(ai) === true){
                        console.log("tire")
                        new Balle(this.scene);
                    }
                },
                loop: false,
            })
        }


        IaGestion2(ai){
            let dist = Phaser.Math.Distance.BetweenPoints(this.scene.player.player,ai);

            if (dist <= 600 && this.aiDeath === false) {
                return true;
            }
            else{
                return false;
                console.log(dist)
            }

        }


    }
