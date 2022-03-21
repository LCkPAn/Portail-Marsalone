let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 360,
    backgroundColor: '#000000',
    parent: 'game',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug : true,
            fps : 60
        }
    },
    scene: new Scene()
};

let game = new Phaser.Game(config);