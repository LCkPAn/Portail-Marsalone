class Player {

    constructor(scene) {
        this.scene = scene
        this.pousse=false
        this.player = this.scene.physics.add.sprite(950, 300, 'player');
        this.player.key=0
        this.player.setBounce(0.1).setVelocityX(0);
        this.scene.physics.add.collider(this.player, this.scene.platforms);
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'robo_player_',
                start: 2,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,

        });
        this.scene.anims.create({
            key: 'jump',
            frames: [{key: 'player', frame: 'robo_player_1'}],
            frameRate: 10,
            repeat:-1,

        });
        this.scene.physics.add.collider(this.player, this.scene.moves,this.force,null,this)
        this.scene.physics.add.collider(this.player, this.scene.doors,this.isKey,null,this)
        this.scene.physics.add.overlap(this.player, this.scene.key,this.getKey,null,this)

    }
    force(player,moves){
        if(player.body.touching.left || player.body.touching.right) {
            moves.setImmovable(false)
            this.pousse = true
        }
        if(player.body.touching.down){
            moves.setImmovable()
            this.player.body.blocked.down=true //ici on fais croire a phaser que le sprite est static pour pouvoir sauter dessus (uniquement valable pour utiliser la fonction onFloor())
        }
    }
    /**
     * des que  le player récupère une clef, la désactive et ajours +1 a la variable key du joueurs
     * @param player
     * @param key
     */
    getKey(player,key){
        this.player.key+=key.key
        key.body.enable=false
        key.visible=false
    }

    /**
     * vérifie que le joueur possède bien une clef et desactive la porte sinon ne fais rien
     * @param player
     * @param door
     */
    isKey(player, door){
        if(player.key>=door.key) {
            player.key-=door.key
            door.body.enable = false
            door.visible=false
            console.log('porte',door.key)
        }
    }
    jump(){
        this.player.setVelocityY(-350);
        this.player.play('jump', true);
        console.log(this.player.key)
    }
    moveRight(){
        this.player.setVelocityX(200);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
    }
    moveLeft(){
        this.player.setVelocityX(-200);
        if (this.player.body.onFloor()) {
                this.player.play('walk', true)}
        this.player.setFlipX(true);
    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
        this.player.play('idle',true)
            }
    }



}