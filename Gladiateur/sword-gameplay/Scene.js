class Scene extends Phaser.Scene {

  preload() {
    // chargement tilemap
    this.load.image("tilemap", "tiles_packed.png");

    // chargement de la map en json
    this.load.tilemapTiledJSON("map", "MapBasique.json");

    // chargement du fond et du yoyo
    this.load.image("bg", "bg.png");
    this.load.image("sword", "sword.png");

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
    this.player.setDepth(0);

    this.sword = this.physics.add.sprite(200, 100, "sword").setScale(.1);
    this.sword.body.setAllowGravity(false);
    this.sword.setDepth(1);
    this.sword.setVisible(false);
    this.sword.attack = 100
    this.sword.disableBody()

    this.enemy = this.physics.add.sprite(700, 100).setDisplaySize(50,100)
    this.enemy.setCollideWorldBounds(true);
    this.enemy.setDepth(0);
    this.enemy.body.setImmovable(true)
    this.enemy.hp = 100;

    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);

    //Ajout des colliders sur la map puis entre la map et le joueur
    this.platforms.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.enemy);
    this.physics.add.collider(this.enemy, this.platforms);
    this.physics.add.collider(this.sword, this.enemy);

    //Ajout des controles
    this.inputManager()

    //Ajout des animations
    this.animManager()

    //Quand on clique avec la souris on fait apparaitre l'épée
    this.input.on('pointerdown', function (pointer) {

      //On rend l'épée visible
      this.sword.setVisible(true);
      //On active le body de l'épée
      this.sword.enableBody()
      //On ajoute un event avec un delay qui fera disparaitre l'épée pendant 250 ms
      this.time.addEvent({ delay: 250, callback: this.onEvent, callbackScope: this });

    }, this);

    let me = this;
    //On enleve des points de vie a l'enemie qu'on touche
    this.physics.add.overlap(this.sword, this.enemy, function (){
      me.enemy.hp -= me.sword.attack;
    })
  }

  //Event qui permet de faire disparaitre l'épée
  onEvent()
  {
    this.sword.disableBody()
    this.sword.setVisible(false);
  }

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
    this.sword.x = this.player.x+40;
    this.sword.y = this.player.y;

    if(this.enemy.hp <= 0){
      this.enemy.disableBody()
      this.enemy.setVisible(false)
    }

    //console.log(this.enemy.hp)
  }
}

