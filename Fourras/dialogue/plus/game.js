//test1
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

// image dialogue
  this.load.image('script', 'assets/buttontitle.png');

  this.load.image('background', 'assets/images/background.png');
  this.load.image('spike', 'assets/images/spike.png');
  // At last image must be loaded with its JSON
  this.load.atlas('player', 'assets/images/kenney_player.png','assets/images/kenney_player_atlas.json');
  this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
  // Load the export Tiled JSON
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/level2.json');
this


}

function create() {

this.add.image(200, 200, "script");


  // rajoute la map sur phaser + gére taille
  const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
  backgroundImage.setScale(2, 0.8);
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles')
  const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);

  // rajoute la physique
  platforms.setCollisionByExclusion(-1, true);

  // ajoute le joueur
  this.player = this.physics.add.sprite(50, 300, 'player');
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, platforms);

  // animation marche
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

  // Active les touches curseurs pour déplacer le joueur
  this.cursors = this.input.keyboard.createCursorKeys();


  this.dialogs = this.physics.add.group({
    allowGravity: false,
    immovable: true
  });

// Créer des boites de dialogues avec Tiled, ce qui veut dire juste placer une tuile (on s'en fou de la texture) pour placer la boite de dialogue
// On créer des boites de dialogues dans notre groupe de sprites pour chaque objet de notre carte
  map.getObjectLayer('dialog').objects.forEach((dialogs) => {
    // On ajoute la boite de dialogue via un pnj
    const dialogSprite = this.dialogs.create(200, 425 - dialogs.height, 'player').setOrigin(0);
  });
// on créer une fonction txt qui permet de définir, l'emplacement, la taille, la couleur de police et le type de police mais pour la police il faut la précharger avant
  this.mytxt = this.add.text(150,250,"",{font: "20px", fill:"#00000"}).setOrigin(0,0).setScrollFactor(0);;
// on ajoute une collision a notre NPC qui nous empêche de passer, on peut faire de même avec un asset
  this.physics.add.collider(this.player, this.dialogs, text, null,this)
//
  this.lock=0
}
// on créer une fonction text, qui lance les dialogues
function text(player,dialog){
  if(this.lock===0){  // si lock ===O on lance le dialogue si dessus
    this.mytxt.setText("[Robot]: Si je te dis abeille ?\nA- C'est beau \nB- C'est bon   \nC- Elle plane")
    this.lock=1 // lock = 1 donc le dialogue ne lancera plus solo
  }
// quand j'appuie sur A je réponds à la question et je peux passer
  this.input.keyboard.on('keydown-A', function () {
    this.mytxt.setText("[Robot]: Dépêche toi de passer ou je te marrave")
    dialog.body.enable=false // Le collider de mon NPC disparait et me permet de passer

  }, this);

  // quand j'appuie sur B je réponds à la question et je ne peux  pas passer
  this.input.keyboard.on('keydown-B', function () {
    this.mytxt.setText("[Robot]: C'est ta gueule que je vais manger tu \nva voir ! Donc une abeille c'est ?\nA- C'est beau \nC- Elle plane")
    dialog.body.enable=true // Le collider de mon NPC reste toujours actif et bloque le passage

  }, this);

  this.input.keyboard.on('keydown-C', function () {
    this.mytxt.setText("[Robot]: C'est toi qui plane l'ami,donc l'abeille \nest ?\nA- C'est beau \nB- C'est bon")
    dialog.body.enable=true // Le collider de mon NPC reste toujours actif et bloque le passage

  }, this);

  /*if (this.cursors.a.isDown){
    this.mytxt.setText("J'encule Xavier deux fois")
    dialog.body.enable=false
  } */


}


// Fonction hit
function playerHit(player, spike) {
    /**player.setVelocity(0, 0);
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
    });*/
}

function update() {

  //Animer ton joueur

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