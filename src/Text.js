class Text  {
    constructor(Tableau1){
        let me = this
        this.scene= Tableau1

    }
// on créer une fonction text, qui lance les dialogues

    text(player,dialog){
        let me = this
        if(this.lock===0){  // si lock ===O on lance le dialogue si dessus
            me.mytxt.setText("[Robot]: Si je te dis abeille ?\nA- C'est beau \nB- C'est bon   \nC- Elle plane")
            me.lock=1 // lock = 1 donc le dialogue ne lancera plus solo
        }
    // quand j'appuie sur A je réponds à la question et je peux passer
        this.scene.input.keyboard.on('keydown-A', function () {
            me.scene.mytxt.setText("[Robot]: Dépêche toi de passer ou je te marrave")
            dialog.body.enable=false // Le collider de mon NPC disparait et me permet de passer

        }, this);

        // quand j'appuie sur B je réponds à la question et je ne peux  pas passer
        this.scene.input.keyboard.on('keydown-B', function () {
            me.scene.mytxt.setText("[Robot]: C'est ta gueule que je vais manger tu \nva voir ! Donc une abeille c'est ?\nA- C'est beau \nC- Elle plane")
            dialog.body.enable=true // Le collider de mon NPC reste toujours actif et bloque le passage

        }, this);

        this.scene.input.keyboard.on('keydown-C', function () {
            me.scene.mytxt.setText("[Robot]: C'est toi qui plane l'ami,donc l'abeille \nest ?\nA- C'est beau \nB- C'est bon")
            dialog.body.enable=true // Le collider de mon NPC reste toujours actif et bloque le passage

        }, this);


    }
}