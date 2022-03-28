class Balle  {
    constructor(Tableau1){
        let me = this
        this.scene= Tableau1
        this.balle = this.scene.physics.add.sprite(this.scene.ai2.x, this.scene.ai2.y, 'balle').setOrigin(0, 0);
        this.balle.setDisplaySize(5,5);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.body.setMaxVelocityX(800);
        this.balle.body.setMaxVelocityY(700);
        this.balle.body.setAllowGravity(false)

        this.scene.physics.moveToObject(this.balle, this.scene.perso, 200);

        this.scene.physics.add.collider(this.balle, this.scene.perso, function () {
            console.log('touchePerso');
            me.balle.destroy(true);

        })

    }




    update(){
        let me = this;


        if(this.balle.y < 0 ){
            this.balle.destroy();
            console.log("detruit")

        }
        if(this.balle.x <  0 ){
            this.balle.destroy()
            console.log("detruit")
        }
        if(this.balle.y > 300){
            this.balle.destroy();
            console.log("detruit")
        }
        if(this.balle.x > 1000 ){
            this.balle.destroy()
            console.log("detruit")
        }
    }
}