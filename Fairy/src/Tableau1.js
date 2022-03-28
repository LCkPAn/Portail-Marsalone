class Tableau1 extends Phaser.Scene {

    function

    preload() {
        this.load.image('luciole', 'deposez assets pour tileset ici/luciole.png');
        this.load.image('yellowFlares', 'deposez assets pour tileset ici/yellowFlares.png');

    }

    function

    create() {




        this.cursors = this.input.keyboard.createCursorKeys();

        //CAMERA
        this.zoom = 1; //variable du zoom à 1 (valeur initiale)
        this.cameras.main.setBounds(0, 0, this.largeurniveau, this.hauteurniveau);//la caméra ne peux pas dépasser les bordures du niveau
        this.cameras.main.setZoom(this.zoom);//la caméra zoom autant que le variable zoom


        this.initKeyboard();



    }

    function


    initKeyboard()
    {
        let me=this;
        var cam = this.cameras.main;

        //touches relâchées
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.R:
                    cam.useBounds=false; //la caméra peut allez en dehors de la map
                    me.vuelarge = true;
                    cam.centerOn(me.largeurniveau/2, me.hauteurniveau/2); //la caméra va au centre de la map
                    //on vérifie si la map est plus grande sur sa hauteur ou sur sa largeur
                    if(me.largeurniveau>me.hauteurniveau)
                    {
                        cam.zoomTo(me.largeurcamera/me.largeurniveau, 0); //la caméra se dézoom pile sur la largeur
                    }
                    else
                    {
                        cam.zoomTo(me.hauteurcamera/me.hauteurniveau, 0); //la caméra se dézoom pile sur la hauteur
                    }
                    break;
            }
        })

        //touches relâchées
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.I:
                    if(me.zoom<=1.4) //on met un maximum de zoom
                    {
                        me.zoom += 0.1
                        cam.zoomTo(me.zoom, 250); //fonction de zoom
                        break;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.L:
                    if(me.zoom>=0.9) //on met un maximum de dézoom
                    {
                        me.zoom -= 0.1
                        cam.zoomTo(me.zoom, 250); //fonction de zoom
                        break;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.R:
                    me.vuelarge = false;
                    cam.zoomTo(me.zoom, 500); //on remet le zoom à la normal
                    break;
            }
        })
    }


    function

    update() {
        // Control the player with left or right keys
        if (this.cursors.left.isDown) {
            this.scrollspeed=-3;
            this.player.setVelocityX(-200);
            if (this.player.body.onFloor()) {
                this.player.play('walk', true);
            }
        } else if (this.cursors.right.isDown) {
            this.scrollspeed=3;
            this.player.setVelocityX(200);
            if (this.player.body.onFloor()) {
                this.player.play('walk', true);
            }
        } else {
            // If no keys are pressed, the player keeps still
            this.player.setVelocityX(0);
            this.scrollspeed=0;
            // Only show the idle animation if the player is footed
            // If this is not included, the player would look idle while jumping
            if (this.player.body.onFloor()) {
                this.player.play('idle', true);
            }
        }

// Player can jump while walking any direction by pressing the space bar
// or the 'UP' arrow
        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
            this.player.setVelocityY(-350);
            this.player.play('jump', true);
        }

        if (this.player.body.velocity.x > 0) {
            this.player.setFlipX(false);
        } else if (this.player.body.velocity.x < 0) {
            // otherwise, make them face the other side
            this.player.setFlipX(true);
        }

        //CAMERA
        if(this.vuelarge == false) //tant que la vue n'est pas large
        {
            this.cameras.main.centerOn(this.player.x,this.player.y); //la caméra se centre sur le joueur
            this.cameras.main.useBounds=true; //la caméra ne peut pas traverser la map
            this.cameras.main.setBounds(0, 0, this.largeurniveau, this.hauteurniveau);//on remet "l'anti-débordement" comme on l'enlève en vue large
        }
    }

}