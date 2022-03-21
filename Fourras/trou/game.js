  const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  heigth: 640,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: true,
    },
  }
};

const game = new Phaser.Game(config);

function preload() {

  this.load.image('background', 'assets/images/background.png');
  this.load.image('spike', 'assets/images/spike.png');
  // At last image must be loaded with its JSON
  this.load.atlas('player', 'assets/images/kenney_player.png','assets/images/kenney_player_atlas.json');
  this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
  // Load the export Tiled JSON
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');

}

function create() {

  const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
  backgroundImage.setScale(2, 0.8);
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');
  const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
  platforms.setCollisionByExclusion(-1, true);


  this.player = this.physics.add.sprite(50, 300, 'player');
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);


  this.physics.add.collider(this.player, platforms);


  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNames('player', {
      prefix: 'robo_player_',
      start: 2,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'idle',
    frames: [{ key: 'player', frame: 'robo_player_0' }],
    frameRate: 10,
  });
  this.anims.create({
    key: 'jump',
    frames: [{ key: 'player', frame: 'robo_player_1' }],
    frameRate: 10,
  });
  this.cursors = this.input.keyboard.createCursorKeys();
  // Pour les trous créez un calque d'objet et placez des images de piques au niveau des trous de la map
  this.trous = this.physics.add.group({
    allowGravity: false,
    immovable: true
  });

// ceci permet au images que vous avez placé sur Tiled d'avoir une boite de colision mais aussi d'etre invisible
  map.getObjectLayer('Trous').objects.forEach((spike) => {
    //si vous utilisez une autre image que les piques remplacez le 'spike' avec le nom de l'image que vous avez remplacé (le nom déclaré dans preload)
    const trousSprite = this.trous.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0).visible = false ;
  });

  //ici j'ai utilisé le playerHit du tuto pour faire le clingotement et le retour au début, si vous pouvez créer votre propre fonction pensez a remplacer "playerHit"
  this.physics.add.collider(this.player, this.trous, playerHit, null, this);

  this.physics.add.collider(this.player, this.spikes, playerHit, null, this);

}
function playerHit(player, spike) {
  player.setVelocity(0, 0);
  player.setX(50);
  player.setY(300);
  player.play('idle', true);
  player.setAlpha(0);
  let tw = this.tweens.add({
    targets: player,
    alpha: 1,
    duration: 100,
    ease: 'Linear',
    repeat: 5,
  });
}

function update() {

  // Control the player with left or right keys
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-200);
    if (this.player.body.onFloor()) {
      this.player.play('walk', true);
    }
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(200);
    if (this.player.body.onFloor()) {
      this.player.play('walk', true);
    }
  } else {
    // If no keys are pressed, the player keeps still
    this.player.setVelocityX(0);
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


}

