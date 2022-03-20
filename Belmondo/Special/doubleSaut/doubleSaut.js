class DoubleSaut extends Phaser.Scene {
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
        this.add.image(400, 300, 'sky');
//CREATION D'UN GROUPE POUR LA REPETITION D'UN OBJET
        platforms = this.physics.add.staticGroup();//ON DETERMINE SON EMPLACEMENT ET SA TEXTURE

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
//CREATION DES ACTIONS DU PERSONNAGE
        player = this.physics.add.sprite(100, 450, 'dude');

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

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);//AJOUT DE COLLISION ENTRE LE PERSONNAGE ET LES PLATFORMES

        this.initKeyboard()

        this.dejaAppuye =false;
        this.doubleJump =0;
    }

    //LA ON DEFINIT CE QU'IL SE PASSE LORSQU'ON APPUIE SUR TELLE OU TELLE TOUCHE
    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.UP:
                        if (me.dejaAppuye) { //SI LA VARIABLE DEJAAPPUYE EST VRAI
                            //FAIS RIEN
                        }
                        else { //SINON
                            me.dejaAppuye = true;//POUR LA PROCHAINE FOIS
                            if (player.body.onFloor()){ // SI LE JOUEUR TOUCHE LE SOL
                                player.setVelocityY(-330); //LE PERSONNAGE VA A UNE VITESSE DE 330 VERS LE HAUT
                                me.doubleJump = 1; //LA VARIABLE DOUBLEJUMP A 1 POUR POUVOIR AVOIR LE DOUBLE SAUT
                            }
                            if (me.doubleJump === 1 && !player.body.onFloor()) { //SI LA VARIABLE DOUBLESAUT EST A 1 ET LE JOUEUR NE TOUCHE PAS LE SOL
                                player.setVelocityY(-330); //LE PERSONNAGE VA A UNE VITESSE DE 330 VERS LE HAUT
                                me.doubleJump = 0; //LA VARIABLE DOUBLEJUMP A 0 POUR NE PLUS POUVOIR AVOIR LE DOUBLE SAUT
                            }
                        }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    player.setVelocityX(160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A DROITE

                    player.anims.play('right', true);//ET ON LUI DEMANDE DE LANCER L'ANIMATION RIGHT QU'ON A CREE DANS LA FONCTION CREATE
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    player.setVelocityX(-160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A GAUCHE

                    player.anims.play('left', true);//ET ON LUI DEMANDE DE LANCER L'ANIMATION LEFT QU'ON A CREE DANS LA FONCTION CREATE
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    me.dejaAppuye = false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    player.setVelocityX(0);//LE PERSO NE BOUGE PAS

                    player.anims.play('turn');//ET ON JOUE L'ANIMATION TUR CREE DANS LA FONCTION CREATE
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    player.setVelocityX(0);//LE PERSO NE BOUGE PAS

                    player.anims.play('turn');//ET ON JOUE L'ANIMATION TUR CREE DANS LA FONCTION CREATE

                    break;
            }
        });
    }
    update ()
    {

    }

}

