class tiled {
    constructor(scene) {
        this.scene=scene
    }
    createtiled() {
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('kenny_simple_platformer', 'tiles');
        this.platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
        this.platforms.setCollisionByExclusion(-1, true);
        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

// Let's get the spike objects, these are NOT sprites
// We'll create spikes in our sprite group for each object in our map
        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            const spikeSprite = this.spikes.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0);
            spikeSprite.body.setSize(spike.width, spike.height - 20).setOffset(0, 20);
        });
        this.physics.add.collider(this.player.player, this.spikes, playerHit, null, this);

        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

// Let's get the save objects, these are NOT sprites
// We'll create saves in our sprite group for each object in our map
        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y + 200 - save.height, 'save').setOrigin(0);
        });
        this.physics.add.overlap(this.player.player, this.saves, sauvegarde,null, this)

        this.moves = this.physics.add.group({
            allowGravity: false,
            immovable: false
        });

// Let's get the move objects, these are NOT sprites
// We'll create moves in our sprite group for each object in our map

        map.getObjectLayer('Mouvable').objects.forEach((move) => {
            const moveSprite = this.moves.create(move.x, move.y + 200 - move.height, 'move').setOrigin(0);
        });
        this.physics.add.collider(this.player.player, this.moves, pousser,null, this)
        this.physics.add.collider(this.moves,this.moves)
    }
}