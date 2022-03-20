class Planner extends Phaser.Scene {
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

        this.initKeyboard()

        this.physics.add.collider(player, platforms);//AJOUT DE COLLISION ENTRE LE PERSONNAGE ET LES PLATFORMES

    }
    //LA ON DEFINIT CE QU'IL SE PASSE LORSQU'ON APPUIE SUR TELLE OU TELLE TOUCHE
    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    me.upDown=true;
                    player.body.setGravity(0.1);
                    if (player.body.touching.down)
                    {
                        player.setVelocityY(-330);//LE JOUR VA A UNE VITESSE DE 330 VERS LE HAUT
                    }
                    if (player.body.velocity.y>=20 && me.rightDown){
                        player.setVelocityX(160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A DROITE
                        player.setVelocityY(20);
                    }
                    if (player.body.velocity.y>=20 && me.leftDown){
                        player.setVelocityX(-160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A DROITE
                        player.setVelocityY(20);
                    }
                    if (!me.leftDown && !me.rightDown && !player.body.touching.down){
                        player.setVelocityY(20);
                    }
                    console.log("up")
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.rightDown=true;
                    console.log('right');
                    if (player.body.velocity.y>=20 && me.upDown){
                        player.setVelocityX(160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A DROITE
                        player.setVelocityY(20);
                    }
                    else {
                        player.setVelocityX(160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A DROITE
                        player.anims.play('right', true);//ET ON LUI DEMANDE DE LANCER L'ANIMATION RIGHT QU'ON A CREE DANS LA FONCTION CREATE
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.leftDown=true;
                    if (player.body.velocity.y>=20 && me.upDown){
                        player.setVelocityX(-160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A DROITE
                        player.setVelocityY(20);
                    }
                    else {
                        player.setVelocityX(-160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A GAUCHE

                        player.anims.play('left', true);//ET ON LUI DEMANDE DE LANCER L'ANIMATION LEFT QU'ON A CREE DANS LA FONCTION CREATE
                    }
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    me.upDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.rightDown=false;
                    player.setVelocityX(0);//LE PERSO NE BOUGE PAS

                    player.anims.play('turn');//ET ON JOUE L'ANIMATION TUR CREE DANS LA FONCTION CREATE
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.leftDown=false;
                    player.setVelocityX(0);//LE PERSO NE BOUGE PAS

                    player.anims.play('turn');//ET ON JOUE L'ANIMATION TUR CREE DANS LA FONCTION CREATE

                    break;
            }
        kevent.preventDefault();
        },true);
    }
    update ()
    {

    }

}

