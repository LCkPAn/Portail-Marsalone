class Tableau1 extends Phaser.Scene {


    preload() {
        // Je preload les images autres que Tiled

        this.load.image('circleG','assets/circleG.png');
        this.load.image('circleB','assets/circleB.png');


        this.load.image('balle','assets/square.png');
        this.load.image('boss','assets/squareY.png');

        // chargement tilemap
        this.load.image("tilemap", "assets/tiles_packed.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");
    }


    create() {
        this.NbBalle = 40;
        this.chargeur = 10;
        this.Pballe = true ;

        // Création du personnage armé
        this.persoA = this.physics.add.sprite(500, 0, 'circleG').setOrigin(0, 0);
        this.persoA.setDisplaySize(30,30);
        this.persoA.body.setAllowGravity(true);
        this.persoA.setVisible(true);


        // Création d'une cible à tuer
        this.boss = this.physics.add.sprite(150, 0,'boss').setOrigin(0, 0);
        this.boss.setDisplaySize(50,50);
        this.boss.body.setAllowGravity(true);
        this.boss.setImmovable(true);

        // Création d'une caisse de munition
        this.munition = this.physics.add.sprite(450, 0,'circleB').setOrigin(0, 0);
        this.munition.setDisplaySize(10,10);
        this.munition.body.setAllowGravity(true);
        this.munition.setImmovable(true);

        // Création d'une caisse de munition
        this.target = this.physics.add.sprite(450, 0,'circleB').setOrigin(0, 0);
        this.target.setDisplaySize(10,10);
        this.target.body.setAllowGravity(false);
        this.target.setImmovable(false);
        this.target.setVisible(false);

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

        if(this.Pballe === true){
            this.input.on('pointerdown', function (pointer) {

                this.tir();
                console.log(this.chargeur);
            }, this);
        }else {
            console.log("Plus de balle")

        }

        // Creation des collision

        this.physics.add.collider(this.persoA, platforms);
        this.physics.add.collider(this.munition, platforms);
        this.physics.add.collider(this.boss, platforms);

        this.initKeyboard();

        this.projectiles = this.add.group();
    }

    // fonction pour faire regarder s'il y a un overlaps donc deux objets qui se touche pour l'utilisé plus facilement.

    checkCollider(Objet1x,Objet1y,Object1TailleLargeur,Object1TailleHauteur,Objet2x,Objet2y,Objet2TaileLargeur,Objet2TailleHauteur){
        if (Objet1x + Object1TailleLargeur > Objet2x && Objet1x < Objet2x + Objet2TaileLargeur
            &&
            Objet1y + Object1TailleHauteur > Objet2y && Objet1y < Objet2y + Objet2TailleHauteur) {
            // Si toutes les conditons sont vrais alors il y a bien un overlaps, on renvoie donc true/vrai a notre foncion sinon on ne renvoie rien
            return true
        }
    }


    tir(){let me = this;
        this.chargeur -= 1;
        this.balle = new Balle(this);

    }


    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:

                    me.persoA.setVelocityX(0);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:


                    me.persoA.setVelocityX(0);

                    break;

            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:

                    me.persoA.setVelocityX(-300);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                    me.persoA.setVelocityX(300);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.E:

                    if(me.checkCollider(me.persoA.x,me.persoA.y,30,30,me.munition.x,me.munition.y,10,10) === true){
                        me.munition.setVisible(false);
                        me.munition.body.setEnable(false);
                        me.NbBalle += 20;
                    }

                    break;

                case Phaser.Input.Keyboard.KeyCodes.R:

                    if(me.NbBalle > 10 && me.chargeur <= 0 ) {
                        me.chargeur = 10
                        me.NbBalle -= 10
                        console.log("rechargement")
                    }else if (me.chargeur !== 0){
                        console.log("j'ai encore des balles")
                    }else{
                        console.log("plus rien du tout")
                    }
                    break;
            }
        })
    }


    update(){

        for(var i = 0; i < this.projectiles.getChildren().length; i++){
            var tir = this.projectiles.getChildren()[i];
            tir.update();
        }

        this.Pballe = this.chargeur > 0;

        this.target.x = game.input.mousePointer.x;
        this.target.y = game.input.mousePointer.y;

    }

    // fin du programme
}