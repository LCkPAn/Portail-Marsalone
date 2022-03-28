class Glisser extends Phaser.Scene {
    //ON PRECHARGE TOUS NOS ASSETS
    preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        //PRECHARGE DU SPRITESHEET AVEC LES DIFFERENTES POSITIONS DU PERSONNAGE
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    //ON DETERMINE DANS LA FONCTION CREATE CE QUE FONT NOS ASSETS
    create ()
    {
        this.add.image(400, 300, 'sky').setScale(2);
//CREATION D'UN GROUPE POUR LA REPETITION D'UN OBJET
        this.platforms = platforms = this.physics.add.staticGroup();//ON DETERMINE SON EMPLACEMENT ET SA TEXTURE

        this.platforms =platforms.create(600, 568, 'ground').setScale(3).refreshBody();

        this.platforms = platforms.create(600, 400, 'ground');
        this.platforms = platforms.create(50, 250, 'ground');
        this.platforms = platforms.create(750, 220, 'ground');
        this.platforms = platforms.create(650, 320, 'ground').setDisplaySize(10,350).refreshBody();

//CREATION DES ACTIONS DU PERSONNAGE
        this.player = player = this.physics.add.sprite(100, 450, 'dude');

        //player.setBounce(0.2);// REBONDISSEMENT DU PERSONNAGE LORSQU'IL SAUTE
        player.setCollideWorldBounds(true);//COLLISION AVEC TOUS LES OBJETS DU JEU


//CREATION DES ANIMATIONS DU PERSONNAGE GRACE AU SPRITESHEET
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),//CE SONT LES IMAGES 0/1/2/3 QUI SONT JOUEES
            frameRate: 10,//NOMBRE D'IMAGES JOUEES
            repeat: -1//REPETITION INFINIE
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],//C'EST L'IMAGE 4 QUI EST JOUEE
            frameRate: 20//NOMBRE D'IMAGES JOUEES
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),//CE SONT LES IMAGES 5/6/7/8 QUI SONT JOUEES
            frameRate: 10,//NOMBRE D'IMAGES JOUEES
            repeat: -1//REPETITION INFINIE
        });

        this.anims.create({
            key: 'tombe',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),//CE SONT LES IMAGES 5/6/7/8 QUI SONT JOUEES
            frameRate: 10,//NOMBRE D'IMAGES JOUEES
            repeat: 1//REPETITION INFINIE
        });



        this.physics.add.collider(player, platforms);//AJOUT DE COLLISION ENTRE LE PERSONNAGE ET LES PLATFORMES
        this.physics.add.collider(player, this.sol);
        this.initKeyboard()

        this.speed={
            speedMultiple : 2,
        }
        this.glissade = this.tweens.add({
            targets: this.speed,
            speedMultiple: 0,
            // alpha: { start: 0, to: 1 },
            // alpha: 1,
            // alpha: '+=1',
            ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,

            //repeat: -1, // -1: infinity
            //yoyo: true
        });
    }

    //LA ON DEFINIT CE QU'IL SE PASSE LORSQU'ON APPUIE SUR TELLE OU TELLE TOUCHE
    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    if (player.body.touching.down)
                    {
                        player.setVelocityY(-330);//LE JOUR VA A UNE VITESSE DE 330 VERS LE HAUT
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.rightDown=true;

                    player.setVelocityX(160);//LE PERSO NE BOUGE PAS

                    //player.setVelocityX(160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A DROITE

                    player.anims.play('right', true);//ET ON LUI DEMANDE DE LANCER L'ANIMATION RIGHT QU'ON A CREE DANS LA FONCTION CREATE
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.leftDown=true;
                    player.setVelocityX(-160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A GAUCHE

                    player.anims.play('left', true);//ET ON LUI DEMANDE DE LANCER L'ANIMATION LEFT QU'ON A CREE DANS LA FONCTION CREATE
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.UP:

                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.rightDown=false;
                    player.setVelocityX(0);

                    player.anims.play('turn');//ET ON JOUE L'ANIMATION TUR CREE DANS LA FONCTION CREATE
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.leftDown=false;
                    player.setVelocityX(0);//LE PERSO NE BOUGE PAS

                    player.anims.play('turn');//ET ON JOUE L'ANIMATION TUR CREE DANS LA FONCTION CREATE

                    break;
            }
        });
    }
    update ()
    {
        if (this.player.body.onFloor()){
            if (this.shiftDown && this.rightDown){
                if (this.flag){

                }else{
                    this.glissade.play();
                    this.flag=true;
                }
                console.log(this.player.getCenter());
                this.player.setVelocityX(160 * this.speed.speedMultiple);
                player.body.setOffset(0,28);
                this.player.body.setSize(this.player.sourceWidth, 20, false);
            }
            if (this.shiftDown && this.leftDown){
                if (this.flag){

                }else{
                    this.glissade.play();
                    this.flag=true;
                }
                player.body.setOffset(0,28);
                this.player.body.setSize(this.player.sourceWidth, 20, false);
                this.player.setVelocityX(-160 * this.speed.speedMultiple);
                console.log(this.player.getCenter());
            }
            if (!this.shiftDown){
                if (this.flag){
                    this.player.setVelocityX(0);
                    this.flag=false;
                    player.body.setOffset(0,0);
                    this.player.body.setSize(this.player.sourceWidth, this.player.sourceHeight, true);
                }
            }
        }
    }
}

