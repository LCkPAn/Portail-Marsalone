//CREATION DE LA SCENE
var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: new Glisser()
};
//VARIABLES
let player;
let platforms;
let cursors;

let game = new Phaser.Game(config);