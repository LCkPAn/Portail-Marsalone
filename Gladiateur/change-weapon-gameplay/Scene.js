class Scene extends Phaser.Scene {

  preload() {
    // chargement tilemap
    this.load.image("tilemap", "tiles_packed.png");

    // chargement de la map en json
    this.load.tilemapTiledJSON("map", "MapBasique.json");

    // chargement du fond et du yoyo
    this.load.image("bg", "bg.png");
    this.load.image("sword", "sword.png");
    this.load.image("yoyo", "yoyo.png");
    this.load.image("enemy", "enemy.png");

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

    this.sword = this.physics.add.sprite(200, 100, "sword").setScale(0.1);
    this.sword.body.setAllowGravity(false);
    this.sword.setDepth(1);
    this.sword.setVisible(false);
    this.sword.attack = 100
    this.sword.disableBody()

    this.enemy = this.physics.add.sprite(500, 100, "enemy").setDisplaySize(50,100)
    this.enemy.setCollideWorldBounds(true);
    this.enemy.setDepth(0);
    this.enemy.body.setImmovable(true)
    this.enemy.hp = 100;

    this.enemy2 = this.physics.add.sprite(700, 100, "enemy").setDisplaySize(50,100)
    this.enemy2.setCollideWorldBounds(true);
    this.enemy2.setDepth(0);
    this.enemy2.body.setImmovable(true)
    this.enemy2.hp = 100;

    this.enemy3 = this.physics.add.sprite(900, 100, "enemy").setDisplaySize(50,100)
    this.enemy3.setCollideWorldBounds(true);
    this.enemy3.setDepth(0);
    this.enemy3.body.setImmovable(true)
    this.enemy3.hp = 100;

    this.yoyo = this.physics.add.sprite(this.player.x, this.player.y, "yoyo")
    this.yoyo.setScale(2)
    this.yoyo.setDepth(0);
    this.yoyo.setDisplaySize(20, 20)
    this.yoyo.launch = false;
    this.yoyo.attack = 100
    this.yoyo.body.setAllowGravity(false)

    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);

    //Ajout des colliders sur la map puis entre la map et le joueur
    this.platforms.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.enemy);
    this.physics.add.collider(this.enemy, this.platforms);
    this.physics.add.collider(this.sword, this.enemy);

    this.physics.add.collider(this.player, this.enemy2);
    this.physics.add.collider(this.enemy2, this.platforms);

    this.physics.add.collider(this.player, this.enemy3);
    this.physics.add.collider(this.enemy3, this.platforms);

    //Ajout des controles
    this.inputManager()

    //Ajout des animations
    this.animManager()

    this.weaponEquipped = 0
  }

  yoyoWeapon(){
    if(this.weaponEquipped === 0) {
      this.input.on('pointerdown', function (pointer) {
        //Si le yoyo n'est pas deja lancé et que la distance entre le pointeur de la souris et le joueur est assez petite on rentre dans la focntion
        if (this.yoyo.launch === false && Phaser.Math.Distance.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY) <= 200) {

          //this.drawLine()
          //On desactive le clavier pour que le joueur ne puisse plus bouger
          if(this.weaponEquipped === 0){
            this.input.keyboard.enabled = false;
          }
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
          let me = this;
          //On enleve des points de vie a l'enemie qu'on touche
          this.physics.add.overlap(this.yoyo, this.enemy, function () {
            me.enemy.hp -= me.yoyo.attack;
          })
          this.physics.add.overlap(this.yoyo, this.enemy2, function () {
            me.enemy2.hp -= me.yoyo.attack;
          })
          this.physics.add.overlap(this.yoyo, this.enemy3, function () {
            me.enemy3.hp -= me.yoyo.attack;
          })
        }
      }, this);
    }
  }

  swordWeapon(){
    if(this.weaponEquipped === 1) {
      //Quand on clique avec la souris on fait apparaitre l'épée
      this.input.on('pointerdown', function (pointer) {

        //On rend l'épée visible
        this.sword.setVisible(true);
        //On active le body de l'épée
        this.sword.enableBody()
        //On ajoute un event avec un delay qui fera disparaitre l'épée pendant 250 ms
        this.time.addEvent({delay: 250, callback: this.onEvent, callbackScope: this});

      }, this);

      let me = this;
      //On enleve des points de vie a l'enemie qu'on touche
      this.physics.add.overlap(this.sword, this.enemy, function () {
        me.enemy.hp -= me.sword.attack;
      })
      this.physics.add.overlap(this.sword, this.enemy2, function () {
        me.enemy2.hp -= me.sword.attack;
      })
      this.physics.add.overlap(this.sword, this.enemy3, function () {
        me.enemy3.hp -= me.sword.attack;
      })
    }
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

    this.input.keyboard.on('keydown-E', function () {
      if(this.weaponEquipped === 0){
        this.sword.disableBody()
        this.yoyo.enableBody()
        this.yoyo.setVisible(true);
        this.sword.setVisible(false);
        this.weaponEquipped = 1;
      }else if(this.weaponEquipped === 1){
        this.yoyo.disableBody()
        this.sword.enableBody()
        this.sword.setVisible(true);
        this.yoyo.setVisible(false);
        this.weaponEquipped = 0;
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
    this.yoyoWeapon();
    this.swordWeapon();
    //Si le personnage est au sol et ne se deplace pas on le mets en etat d'idle
    if (this.player.body.blocked.down && this.player.body.velocity.x === 0) {
      this.player.anims.play('idle', true);
    }
    if(this.weaponEquipped === 1){
      this.sword.x = this.player.x+40;
      this.sword.y = this.player.y;
      this.player.body.setAllowGravity(true)
      this.player.body.setImmovable(false)
    }

    if(this.enemy.hp <= 0){
      this.enemy.disableBody()
      this.enemy.setVisible(false)
    }
    if(this.enemy2.hp <= 0){
      this.enemy2.disableBody()
      this.enemy2.setVisible(false)
    }
    if(this.enemy3.hp <= 0){
      this.enemy3.disableBody()
      this.enemy3.setVisible(false)
    }


    if(this.weaponEquipped === 0){
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
    }

    if(this.weaponEquipped === 0){
      this.sword.disableBody()
      this.yoyo.enableBody()
      this.yoyo.setVisible(true);
      this.sword.setVisible(false);
    }else if(this.weaponEquipped === 1){
      this.yoyo.disableBody()
      this.yoyo.setVisible(false);
    }

    //console.log(this.weaponEquipped);
    //console.log(this.input.keyboard.enabled)
  }
}

