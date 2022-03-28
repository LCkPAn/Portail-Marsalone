class Tableau1 extends Phaser.Scene {



    preload() {
        // Je preload les images autres que Tiled
        this.load.image('circle','assets/circle.png');
        this.load.image('circleG','assets/circleG.png');
        this.load.image('circleB','assets/circleB.png');

        this.load.image('grenouille','assets/vf2.png');

        this.load.image('Arme1','assets/square.png');
        this.load.image('Arme2','assets/squareY.png');

        this.load.image('shield','assets/shield.png' )

        // chargement tilemap
        this.load.image("tilemap", "assets/tiles_packed.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");
    }


    create() {
        let me=this;
        this.gauche = true;


        // Création du personnage de base
        this.perso = this.physics.add.sprite(500, 0, 'circle').setOrigin(0, 0);
        this.perso.setDisplaySize(30,30);
        this.perso.body.setAllowGravity(true);
        this.perso.setVisible(true);

        // Création du personnage de base
        this.ai = this.physics.add.sprite(200, 0, 'grenouille').setOrigin(0, 0);
        this.ai.setDisplaySize(50,75);
        this.ai.body.setAllowGravity(true);
        this.ai.setVisible(true);



        // Création du bouclier

        this.shield = this.physics.add.sprite(200, 0,'shield').setOrigin(0, 0);
        this.shield.setDisplaySize(25,25);
        this.shield.body.setAllowGravity(false);
        this.shield.setFlipX(true);
        this.shield.setVisible(false);
        this.shield.setImmovable(true);
        this.shield.body.setEnable(false);

       // creation d'un projectille

        this.bullet = this.physics.add.sprite(200, 180,'Arme1').setOrigin(0, 0);
        this.bullet.setDisplaySize(20,20);
        this.bullet.body.setAllowGravity(false);
        this.bullet.setVelocityX(125);

        // chargement de la map
        const map = this.add.tilemap("map");
        // chargement du tileset
        const tileset = map.addTilesetImage(
            "game_tile",
            "tilemap"
        );

        // chargement du calque plateformes
        const platforms = map.createLayer(
            "calque_plateformes",
            tileset
        );

        platforms.setCollisionByExclusion(-1, true);


        // target or player's x, y
        const tx = this.perso.x
        const ty = this.perso.y

        const iax = this.ai.x;
        const iay = this.ai.y;





        // Creation des collision

        this.physics.add.collider(this.perso, platforms);


        this.physics.add.collider(this.ai, platforms);
        //Creation des collision entre le shield et le la balle et detruit si toucher
        this.physics.add.collider(this.shield, this.bullet, function () {
            console.log('touche');
            me.bullet.destroy(true)
        })





        this.physics.add.collider(this.bullet, this.perso, function () {
            console.log('touchePerso');
            me.bullet.destroy(true);
            me.perso.destroy(true);
            me.shield.destroy(true);
        })

        this.initKeyboard();
    }


    update(){
        // on tp constament les shield au joueur

        if (this.gauche == true ){
            this.shield.setFlipX(true);
            this.shield.x = this.perso.x -10    ;
            this.shield.y = this.perso.y
        }

        else {
            this.shield.setFlipX(false);
            this.shield.x = this.perso.x + 15 ;
            this.shield.y = this.perso.y
        }



        if (this.perso.x <= this.ai.x){
            this.ai.setVelocityX(-200)
        }
        else {
            this.ai.setVelocityX(200)
        }

    }
    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:

                    me.perso.setVelocityX(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:

                    me.perso.setVelocityX(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.F:

                    me.shield.setVisible(false)
                    me.shield.body.setEnable(false);
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:
                        me.gauche = true;
                        me.perso.setVelocityX(-300);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:
                        me.gauche = false;
                        me.perso.setVelocityX(300);

                    break;

                    //Quand on appuie ça fait apparaitre le shield est active son collider
                case Phaser.Input.Keyboard.KeyCodes.F:
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
        })
    }


    // fin du programme
}