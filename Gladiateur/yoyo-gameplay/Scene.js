class Scene extends Phaser.Scene {

  preload() {
    // chargement tilemap
    this.load.image("tilemap", "tiles_packed.png");

    // chargement de la map en json
    this.load.tilemapTiledJSON("map", "MapBasique.json");

    // chargement du fond et du yoyo
    this.load.image("bg", "bg.png");
    this.load.image("yoyo", "yoyo.png");

    // chargement sprite joueur
    this.load.spritesheet('player', 'player.png', {frameWidth: 48, frameHeight: 48});
  }

  //Fonction qui permet d'ajouter la Map
  addTileMap(){
    //Ajout du fond
    this.bg = this.add.image(0, 0, "bg").setOrigin(0, 0)
    // chargement de la map
    this.map = this.add.tilemap("map");
    // chargement du tileset
    this.tileset = this.map.addTilesetImage(
        "game_tile",
        "tilemap"
    );

    // chargement du calque plateformes
    this.platforms = this.map.createLayer(
        "calque_plateformes",
        this.tileset
    );
  }

  create() {
    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 1080, 360);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 1080, 360);

    this.addTileMap();

    //Ajout du joueur et de ses parametres
    this.player = this.physics.add.sprite(200, 100, "player")
    this.player.flipX = true;
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1);

    //Ajout du yoyo et de ses parametres
    this.yoyo = this.physics.add.sprite(this.player.x, this.player.y, "yoyo")
    this.yoyo.setScale(2)
    this.yoyo.setDepth(0);
    this.yoyo.setDisplaySize(20, 20)
    this.yoyo.launch = false;
    this.yoyo.body.setAllowGravity(false)

    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);

    //Ajout des colliders sur la map puis entre la map et le joueur
    this.platforms.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.platforms);

    //Ajout des controles
    this.inputManager()

    //Ajout des animations
    this.animManager()

    //Fonction qui se declenche a chaque fois qu'on clique avec la souris
    this.input.on('pointerdown', function (pointer) {
      //Si le yoyo n'est pas deja lancé et que la distance entre le pointeur de la souris et le joueur est assez petite on rentre dans la focntion
      if(this.yoyo.launch === false && Phaser.Math.Distance.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY) <= 200){

        //this.drawLine()
        //On desactive le clavier pour que le joueur ne puisse plus bouger
        this.input.keyboard.enabled = false;
        //On indique qu'on est en train de lancer le yoyo avec le booleen launch
        this.yoyo.launch = true;
        //On reset la velocité du joueur
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        //On desactive ça soumission a la gravité et on le rend immobile
        this.player.body.setAllowGravity(false)
        this.player.body.setImmovable(true)
        //On ajoute un tween pour creer le mouvement du yoyo
        this.yoyoTween = this.tweens.add({
          //La cible du tween est le yoyo (l'objet qu'il fera bouger)
          targets: this.yoyo,
          //On lui donne les coordonnées de la destination
          x: pointer.worldX,
          y: pointer.worldY,
          //On definit ça durée
          duration: 300,
          //On definit son type de mouvement
          ease: 'Power2',
          //On active le parametre yoyo pour que le mouvement revienne a sa position initial
          yoyo: true,
        });
      }
    }, this);

  }

  /*drawLine(){
    this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0x000000 } });
    this.line = new Phaser.Geom.Line(this.player.x, this.player.y, this.yoyo.x, this.yoyo.y);
    this.line.x2 = this.yoyo.x;
    this.line.y2 = this.yoyo.y;
    this.redraw();
  }

  redraw ()
  {
    this.graphics.clear();

    var points = Phaser.Geom.Line.BresenhamPoints(this.line, 30);

    for(var i = 0; i < points.length; i++)
    {

      this.graphics.fillPointShape(points[i], 30);

    }

    this.graphics.strokeLineShape(this.line);

  }*/

  //Input Manager va nous permettre de gerer les differents input
  inputManager() {
    //Ici on va gerer les evenements quand on appuie sur une touche
    this.input.keyboard.on('keydown-D', function () {
        //On modifie la vitesse du joueur
        this.player.setVelocityX(160);
        //On joue l'animation qui correspond
        this.player.anims.play('run', true);
    }, this);
    this.input.keyboard.on('keydown-Q', function () {
      //On modifie la vitesse du joueur
        this.player.setVelocityX(-160);
      //On joue l'animation qui correspond
        this.player.anims.play('run', true);
    }, this);
    this.input.keyboard.on('keydown-SPACE', function () {
        //On fait sauter le joueur uniquement si il est au sol
        if (this.player.body.blocked.down) {
          //On modifie la vitesse du joueur
          this.player.setVelocityY(-300);
          //On joue l'animation qui correspond
          this.player.anims.play('jump', true);
        }
    }, this);

    //Ici on va gerer les evenements quand on relache une touche
    this.input.keyboard.on('keyup-D', function () {
      //On modifie la vitesse du joueur
      this.player.setVelocityX(0);
      //On joue l'animation qui correspond
      this.player.anims.play('idle', true);
    }, this);
    this.input.keyboard.on('keyup-Q', function () {
      //On modifie la vitesse du joueur
      this.player.setVelocityX(0);
      //On joue l'animation qui correspond
      this.player.anims.play('idle', true);
    }, this);

  }

  //L'anim Manager va nous permettre de creer les animations
  animManager(){
    //On va donc creer les animations du personnage avec les frames voulu
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player', {start: 1, end: 1}),
      frameRate: 10,
      repeat: -1
    });
    this.idle = this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', {start: 0, end: 0}),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    //Si le personnage est au sol et ne se deplace pas on le mets en etat d'idle
    if (this.player.body.blocked.down && this.player.body.velocity.x === 0) {
      this.player.anims.play('idle', true);
    }
    //Si le yoyo n'est pas en train d'etre lancer on mets a jouer ça position pour qu'il reste sur le personnage
    if(!this.yoyo.launch){
      this.yoyo.x = this.player.x;
      this.yoyo.y = this.player.y;
    }
    //Sinon on reset la velocité du joueur
    else{
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      //this.drawLine()
      //Une fois l'animation terminée
      if(this.yoyoTween.progress === 1){
        //On reactive le clavier
        this.input.keyboard.enabled = true;
        //this.redraw()
        //On remets le booleen launch a false pour indiquer qu'on ne lance plus le yoyo
        this.yoyo.launch = false;
        //On remets les valeurs par defauts du joueur
        this.player.body.setAllowGravity(true)
        this.player.body.setImmovable(false)
      }
    }

    //console.log(this.yoyo.launch)
    //console.log(this.input.activePointer.worldX)
    //console.log(this.input.activePointer.worldY)
  }
}

