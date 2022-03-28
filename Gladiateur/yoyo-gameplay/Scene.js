class Scene extends Phaser.Scene {

  preload() {
    // chargement tilemap
    this.load.image("tilemap", "tiles_packed.png");

    // chargement de la map en json
    this.load.tilemapTiledJSON("map", "MapBasique.json");

    this.load.image("bg", "bg.png");
    this.load.image("yoyo", "yoyo.png");

    this.load.spritesheet('player', 'player.png', {frameWidth: 48, frameHeight: 48});
  }

  addTileMap(){
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

    this.player = this.physics.add.sprite(200, 100, "player");
    this.player.flipX = true;
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1);

    this.yoyo = this.physics.add.sprite(this.player.x, this.player.y, "yoyo")
    this.yoyo.setScale(2)
    this.yoyo.setDepth(0);
    this.yoyo.setDisplaySize(20, 20)
    this.yoyo.launch = false;
    this.yoyo.body.setAllowGravity(false)

    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);

    this.platforms.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.platforms);

    this.inputManager()

    this.animManager()

    this.input.on('pointerdown', function (pointer) {
      if(this.yoyo.launch === false && Phaser.Math.Distance.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY) <= 200){

        //this.drawLine()
        this.input.keyboard.enabled = false;
        this.yoyo.launch = true;
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.body.setAllowGravity(false)
        this.player.body.setImmovable(true)
        this.yoyoTween = this.tweens.add({
          targets: this.yoyo,
          x: pointer.worldX,
          y: pointer.worldY,
          duration: 300,
          ease: 'Power2',
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

  inputManager() {

    this.input.keyboard.on('keydown-D', function () {
        this.player.setVelocityX(160);
        this.player.anims.play('run', true);
    }, this);
    this.input.keyboard.on('keydown-Q', function () {
        this.player.setVelocityX(-160);
        this.player.anims.play('run', true);
    }, this);
    this.input.keyboard.on('keydown-SPACE', function () {
        if (this.player.body.blocked.down) {
          this.player.setVelocityY(-300);
          this.player.anims.play('jump', true);
        }
    }, this);

    this.input.keyboard.on('keyup-D', function () {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }, this);
    this.input.keyboard.on('keyup-Q', function () {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }, this);

  }

  animManager(){
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
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', {start: 0, end: 0}),
      frameRate: 10,
      repeat: -1
    });
  }

  update() {
    if (this.player.body.blocked.down && this.player.body.velocity.x === 0) {
      this.player.anims.play('idle', true);
    }
    if(!this.yoyo.launch){
      this.yoyo.x = this.player.x;
      this.yoyo.y = this.player.y;
    }
    else{
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      //this.drawLine()
      if(this.yoyoTween.progress === 1){
        this.input.keyboard.enabled = true;
        //this.redraw()
        this.yoyo.launch = false;
        this.player.body.setAllowGravity(true)
        this.player.body.setImmovable(false)
      }
    }

    console.log(this.yoyo.launch)
    //console.log(this.input.activePointer.worldX)
    //console.log(this.input.activePointer.worldY)
  }
}

