class Balle extends Phaser.GameObjects.Sprite{
    constructor(scene) {

        let x = scene.persoA.x;
        let y = scene.persoA.y;
        let dirx = scene.dirx;
        let diry = scene.diry;
        let boss = scene.boss

        super(scene,x,y,"balle");

        scene.add.existing(this);

        scene.physics.world.enableBody(this)
        this.body.velocity.y = diry;
        this.body.velocity.x = dirx;
        this.setDisplaySize(10,10);
        this.body.setAllowGravity(false);

        scene.projectiles.add(this);
    }

    update(){

        if(this.y < 0 ){
            this.destroy();
        }
        if(this.y > 300 ){
            this.destroy();
        }
        if(this.x < 0 ){
            this.destroy();
        }
        if(this.x > 1000 ){
            this.destroy();
        }

    }

}