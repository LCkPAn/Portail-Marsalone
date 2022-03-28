class Tableau1 extends Phaser.Scene {



    preload() {
        // Je preload les images autres que Tiled
        this.load.image('circle','assets/circle.png');
        this.load.image('circleG','assets/circleG.png');
        this.load.image('circleB','assets/circleB.png');

        this.load.image('sword','assets/sword.png');

        this.load.image('grenouille','assets/vf2.png');

        this.load.image('Arme1','assets/square.png');
        this.load.image('Arme2','assets/squareY.png');

        // chargement tilemap
        this.load.image("tilemap", "assets/tiles_packed.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");


    }


    create() {

        this.Zone = false;
        let me=this;
        this.gauche = true;
        this.CD = true;
        this.tireD = false;





        // Création du personnage de base
        this.perso = this.physics.add.sprite(500, 0, 'circle').setOrigin(0, 0);
        this.perso.setDisplaySize(30,30);
        this.perso.body.setAllowGravity(true);
        this.perso.setVisible(true);
        this.perso.hp = 300;

        // Création du personnage de base
        this.ai = this.physics.add.sprite(150, 0, 'grenouille').setOrigin(0, 0);
        this.ai.setDisplaySize(50,75);
        this.ai.body.setAllowGravity(true);
        this.ai.setVisible(true);
        this.stop = this.ai.x


        // Création Ia qui snipe
        this.ai2 = this.physics.add.sprite(50, 0, 'grenouille').setOrigin(0, 0);
        this.ai2.setDisplaySize(50,75);
        this.ai2.body.setAllowGravity(true);
        this.ai2.setVisible(true);


        this.sword = this.physics.add.sprite(200, 100, "sword").setScale(0.1,0.1);
        this.sword.body.setAllowGravity(false);
        this.sword.setDepth(1);
        this.sword.setVisible(false);
        this.sword.attack = 100
        this.sword.disableBody()

       // creation d'un projectille

        this.bullet = this.physics.add.sprite(200, 180,'Arme1').setOrigin(0, 0);
        this.bullet.setDisplaySize(20,20);
        this.bullet.body.setAllowGravity(false);


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
        this.physics.add.collider(this.sword, this.perso);
        this.physics.add.collider(this.ai, platforms);
        this.physics.add.collider(this.ai2, platforms);





        this.physics.add.collider(this.bullet, this.perso, function () {
            console.log('touchePerso');
            me.bullet.destroy(true);
            me.perso.destroy(true);
        })

        this.initKeyboard();

        this.physics.add.overlap(this.sword, this.perso, function (){
            me.perso.hp -= me.sword.attack;
        })

        this.projectiles = this.add.group();

        this.time.addEvent({ delay: 500, callback: this.tir, callbackScope: this,loop : true });



    }

    tir(){
        let me = this;



        if (this.tireD === true){
            this.balle = new Balle(this);
            this.physics.add.collider(this.perso, this.balle, function (){
                console.log("ok")
            })
        }


    }

     IaGestion2(){
         this.dist2 = Phaser.Math.Distance.BetweenPoints(this.perso,this.ai2);

         if (this.dist2 <= 400){
             this.tireD = true
             console.log("tire")

         }
         else{
             this.tireD = false;
         }

    }


    IaGesttion(){
        this.gauche = false;


        this.dist = Phaser.Math.Distance.BetweenPoints(this.perso,this.ai);


        if (this.dist <= 300 ){
            if (this.perso.x <= this.ai.x){
                this.ai.setVelocityX(-200)
                this.gauche = true;
            }
            else if(this.perso.x >= this.ai.x) {
                this.ai.setVelocityX(200)


            }

            this.stop = this.ai.x;

            this.time.addEvent({ delay: 50, callback: this.Jump, callbackScope: this });

            if (this.dist <=  100 ){
                this.attackAi()
            }
        }
    }

    attackAi(){
        this.ai.setVelocityX(0);

        if(this.CD === true) {
            this.sword.y = this.ai.y + 47;

            if (this.gauche === true) {
                this.sword.x = this.ai.x - 10;
                this.sword.flipX = true;
            } else {
                this.sword.x = this.ai.x + 60;
                this.sword.flipX = false;
            }

            //On rend l'épée visible
            this.sword.setVisible(true);
            //On active le body de l'épée
            this.sword.enableBody()
            //On ajoute un event avec un delay qui fera disparaitre l'épée dans 50 ms
            this.time.addEvent({delay: 50, callback: this.onEvent, callbackScope: this});

        }else{
            this.time.addEvent({delay: 1000, callback: this.cd, callbackScope: this});
        }
    }

    cd()
    {
        this.CD = true;
        console.log("neuneu")
    }

    onEvent()
    {
        this.sword.disableBody()
        this.sword.setVisible(false);
        this.CD = false;
        console.log("on se retire")
    }

    Jump()
    {
        if(this.stop === this.ai.x && this.dist >=  110 ){
            this.ai.set
            this.ai.setVelocityY(-100);
        }
    }

    update(){


        for(var i = 0; i < this.projectiles.getChildren().length; i++){
            var tir = this.projectiles.getChildren()[i];
            tir.update();
        }


       this.IaGestion2()


        //this.time.addEvent({
          //  delay: 500,
            //callback: ()=>{
              //  this.tir();
            //},
            //loop: true
        //})



        if(this.perso.hp <= 0){
            this.perso.disableBody()
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
            }
        })
    }


    // fin du programme
}