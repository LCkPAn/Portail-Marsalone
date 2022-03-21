const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 5120,
    heigth: 640,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 5120,
        heigth: 640
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false ,
        },
    },
    scene: new TableauTiled()
};

const game = new Phaser.Game(config);

