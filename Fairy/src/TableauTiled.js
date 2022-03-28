class TableauTiled extends Tableau1 {


    loadFrames(prefix,url,length) {
        let frames = [];
        for (let i = 1; i <= length; i++) {
            this.load.image(prefix + i, url + i + '.png')
        }
        return frames;
    }

    getFrames(prefix,length){
        let frames=[];
        for (let i=1;i<=length;i++){
            frames.push({key: prefix+i});
        }
        return frames;
    }

    preload() {
        super.preload();
        this.load.image('background', 'assets/images/background.png');
        this.load.image('arbre1', 'assets/anims/arbreAube.png');
        this.load.image('arbre2', 'assets/anims/arbreJour.png');
        this.load.image('arbre3', 'assets/anims/arbreSoir.png');
        this.load.image('arbre4', 'assets/anims/arbreNuit.png');
        this.load.image('luciole1', 'assets/anims/luciole.png');
        this.load.image('luciole2', 'assets/anims/luciole2.png');
        this.load.image('luciole3', 'assets/anims/luciole3.png');
        this.load.image('luciole4', 'assets/anims/luciole4.png');
        this.load.image('nuage', 'assets/anims/nuage.png');
        this.load.image('water', 'assets/anims/water.png');
        this.load.image('fumer', 'assets/anims/fumer.png');
        this.load.image('Emit1', 'assets/anims/Emit1.png');
        this.load.image('Emit2', 'assets/anims/Emit2.png');
        this.load.image('Emit3', 'assets/anims/Emit3.png');
        this.load.image('Emit4', 'assets/anims/Emit4.png');
        this.load.image('Emit5', 'assets/anims/Emit5.png');
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('Emit6', 'assets/anims/Emit6.png');
        this.loadFrames('TreeA', 'assets/aa/aa',6);
        this.loadFrames('TreeC', 'assets/ac/ac',6);
        this.loadFrames('TreeJ', 'assets/aj/aj',6);
        this.loadFrames('TreeN', 'assets/an/an',6);



        // At last image must be loaded with its JSON
        this.load.image('tiles', 'assets/tilesets/tilesheetFT.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/blockout.json');

    }



    create() {
        super.create();

        //Création de toutes les animations
        //Arbre1
        this.anims.create({
            key: 'TreeMoove1',
            frames: this.getFrames("TreeA",6),
            frameRate: 3,
            repeat: -1,
        });
        //Arbre2
        this.anims.create({
            key: 'TreeMoove3',
            frames: this.getFrames("TreeC",6),
            frameRate: 3,
            repeat: -1,
        });
        //Arbre3
        this.anims.create({
            key: 'TreeMoove2',
            frames: this.getFrames("TreeJ",6),
            frameRate: 3,
            repeat: -1,
        });
        //Arbre4
        this.anims.create({
            key: 'TreeMoove4',
            frames: this.getFrames("TreeN",6),
            frameRate: 3,
            repeat: -1,
        });



        // Création de tout les emmiters
        //Luciole1
        this.configFX1 = {
            rotate: {min:0,max:360},
            scale: {start: 0.2, end: 0.1},
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
            speed:12
        };
        //Luciole2
        this.configFX2 = {
            angle: { min: 180, max: 360 },
            speed: 150,
            gravityY: 350,
            lifespan: 150,
            quantity: 3,
            scale: { start: 0.1, end: 0.2 },
            blendMode: 'ADD'
        };
        //Luciole3
        this.configFX3 = {
            lifespan: { min: 120, max: 180 },
            angle: { start: 0, end: 360, steps: 64 },
            speed: 80,
            quantity: 16,
            scale: { start: 0.2, end: 0.1 },
            frequency: 32,
            blendMode: 'ADD'
        };
        //Luciole4
        this.configFX4 = {
            lifespan: 250,
            angle: { start: 360, end: 0, steps: 32 },
            speed: 100,
            scale: { start: 0.2, end: 0 },
            frequency: 40,
            blendMode: 'ADD'
        };

        //Terre
        this.configFX5 = {
            frequency:200,
            lifespan: 2000,
            quantity:10,
            x:{min:-32,max:32},
            y:{min:-12,max:52},
            rotate: {min:-10,max:10},
            speedX: { min: -10, max: 10 },
            scale: {start: 0, end: 1},
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
        };
        //Reflet Eau
        this.configFX6 = {
            frequency:1500,
            lifespan: 2500,
            quantity:10,
            x:{min:-32,max:32},
            y:{min:-12,max:52},
            rotate: {min:-10,max:10},
            scale: {min: 0.1, max: 0.3},
            alpha: { start: 0.5, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
        };

        //Etoiles
        this.configFX7 = {
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.8, end: 0 },
            alpha: { start: 0.1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
            lifespan: 100,
        };

        //Brillance arbre
        this.configFX8 = {
            frequency:800,
            lifespan: 4000,
            quantity:10,
            tint: 0xFF7F00,
            x:{min:-32,max:32},
            y:{min:-12,max:52},
            rotate: {min:-10,max:10},
            scale: {min: 0.2, max: 0.3},
            alpha: { start: 0.2, end: 0.1 },
            blendMode: Phaser.BlendModes.ADD,
        };

        //Rosée matin
        this.configFX9 = {
            frequency:450,
            lifespan: 18000,
            quantity:2,
            x:{min:-32,max:32},
            y:{min:-12,max:52},
            rotate: {min:-70,max:70},
            speedX: { min: -20, max: 20 },
            scale: {start: 0.8, end: 0.2},
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
        };

        //Partsol
        this.configFX10 = {
            frequency:250,
            lifespan: 1500,
            quantity:2,
            x:{min:-32,max:32},
            y:{min:-12,max:52},
            tint:0x582900,
            rotate: {min:-10,max:10},
            speedX: { min: -10, max: 10 },
            speedY: { min: -10, max: -20 },
            scale: {start: 0, end: 1},
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
        };



        // On créer la taille du niveau
        this.vuelarge = false;
        this.largeurniveau = 5120;
        this.hauteurniveau = 640;
        this.largeurcamera = 1200;
        this.hauteurcamera = 640;

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);

        //notre map
        const map = this.make.tilemap({key: 'map'});
        //nos images qui vont avec la map
        const tileset = map.addTilesetImage('tilesheetFT', 'tiles');


        //On charge les layers Tiled du dernier au premier plan, les layers de Tiles sont une simple ligne
        const platforms5 = map.createLayer('ciel', tileset, 0, 200);
        const platforms4 = map.createLayer('plan4', tileset, 0, 200);
        const platforms3 = map.createLayer('plan3', tileset, 0, 200);
        const platforms2 = map.createLayer('Decor', tileset, 0, 200);

        //Les layers d'objets : on charge d'abord la physique des objets.
        this.arbre4 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        //Puis le layer en question en positionnant objet par objet.
        map.getObjectLayer('Arbre4').objects.forEach((arbre4) => {
            const arbre4Sprite = this.arbre4.create(arbre4.x, arbre4.y + 200 - arbre4.height, 'arbre4').setOrigin(0);
            arbre4Sprite.play('TreeMoove4'); //On ajoute l'animation
            arbre4Sprite.scrollFactorX=0.97; //On ajoute la parallaxe
        });


        this.arbre3 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Arbre3').objects.forEach((arbre3) => {
            const arbre3Sprite = this.arbre3.create(arbre3.x, arbre3.y + 200 - arbre3.height, 'arbre3').setOrigin(0);
            arbre3Sprite.play('TreeMoove3'); //On ajoute l'animation
            arbre3Sprite.scrollFactorX=0.97;
        });


        this.arbre2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Arbre2').objects.forEach((arbre2) => {
            const arbre2Sprite = this.arbre2.create(arbre2.x, arbre2.y + 200 - arbre2.height, 'arbre2').setOrigin(0);
            arbre2Sprite.play('TreeMoove2'); //On ajoute l'animation
            arbre2Sprite.scrollFactorX=0.97;
        });



        this.arbre1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Arbre1').objects.forEach((arbre1) => {
            const arbre1Sprite = this.arbre1.create(arbre1.x, arbre1.y + 200 - arbre1.height, 'arbre1').setOrigin(0);
            arbre1Sprite.play('TreeMoove1'); //On ajoute l'animation
            arbre1Sprite.scrollFactorX=0.97;
        });

        const platforms1 = map.createLayer('Base', tileset, 0, 200);

        this.Emit1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Terre').objects.forEach((Emit1) => {
            this.Emit1Sprite = this.Emit1.create(Emit1.x+64, Emit1.y + 232 - Emit1.height, 'Emit1').setOrigin(0).setVisible(0);
            this.Emit1Sprite.body.setSize(Emit1.width, Emit1.height).setOffset(0,0);
            this.Emit1SpriteFX = this.add.particles('fumer') //On charge les particules à appliquer au layer
            this.Emit1SpriteFX.createEmitter(this.configFX5) //On crée l'émetteur
            this.Emit1SpriteFX.x = this.Emit1Sprite.x
            this.Emit1SpriteFX.y = this.Emit1Sprite.y
        });


        this.Emit2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('RefletEau').objects.forEach((Emit2) => {
            this.Emit2Sprite = this.Emit2.create(Emit2.x+32, Emit2.y + 232 - Emit2.height, 'Emit2').setOrigin(0).setVisible(0);
            this.Emit2Sprite.body.setSize(Emit2.width, Emit2.height).setOffset(0,0);
            this.Emit2SpriteFX = this.add.particles('water')//On charge les particules à appliquer au layer
            this.Emit2SpriteFX.createEmitter(this.configFX6)
            this.Emit2SpriteFX.x = this.Emit2Sprite.x
            this.Emit2SpriteFX.y = this.Emit2Sprite.y
        });


        this.Emit3 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Etoiles').objects.forEach((Emit3) => {
            this.Emit3Sprite = this.Emit3.create(Emit3.x+32, Emit3.y + 232 - Emit3.height, 'Emit3').setOrigin(0).setVisible(0);
            this.Emit3Sprite.body.setSize(Emit3.width, Emit3.height).setOffset(0,0);
            this.Emit3SpriteFX = this.add.particles('water')//On charge les particules à appliquer au layer
            this.Emit3SpriteFX.createEmitter(this.configFX7)
            this.Emit3SpriteFX.x = this.Emit3Sprite.x
            this.Emit3SpriteFX.y = this.Emit3Sprite.y
        });


        this.Emit4 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('BrillanceArbre').objects.forEach((Emit4) => {
            this.Emit4Sprite = this.Emit4.create(Emit4.x+16, Emit4.y + 232 - Emit4.height, 'Emit4').setOrigin(0).setVisible(0);
            this.Emit4Sprite.body.setSize(Emit4.width, Emit4.height).setOffset(0,0);
            this.Emit4SpriteFX = this.add.particles('luciole2')//On charge les particules à appliquer au layer
            this.Emit4SpriteFX.createEmitter(this.configFX8)
            this.Emit4SpriteFX.x = this.Emit4Sprite.x
            this.Emit4SpriteFX.y = this.Emit4Sprite.y
            this.Emit4SpriteFX.scrollFactorX=0.97;
        });


        this.Emit5 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('RoseeMatin').objects.forEach((Emit5) => {
            this.Emit5Sprite = this.Emit5.create(Emit5.x+32, Emit5.y + 232 - Emit5.height, 'Emit5').setOrigin(0).setVisible(0);
            this.Emit5Sprite.body.setSize(Emit5.width, Emit5.height).setOffset(0,0);
            this.Emit5SpriteFX = this.add.particles('nuage')//On charge les particules à appliquer au layer
            this.Emit5SpriteFX.createEmitter(this.configFX9)
            this.Emit5SpriteFX.x = this.Emit5Sprite.x
            this.Emit5SpriteFX.y = this.Emit5Sprite.y
        });


        this.Emit6 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('PartSol').objects.forEach((Emit6) => {
            this.Emit6Sprite = this.Emit6.create(Emit6.x+32, Emit6.y + 232 - Emit6.height, 'Emit6').setOrigin(0).setVisible(0);
            this.Emit6Sprite.body.setSize(Emit6.width, Emit6.height).setOffset(0,0);
            this.Emit6SpriteFX = this.add.particles('luciole2')//On charge les particules à appliquer au layer
            this.Emit6SpriteFX.createEmitter(this.configFX10)
            this.Emit6SpriteFX.x = this.Emit6Sprite.x
            this.Emit6SpriteFX.y = this.Emit6Sprite.y
        });


        this.luciole1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Luciole1').objects.forEach((luciole1) => {
            this.luciole1Sprite = this.luciole1.create(luciole1.x, luciole1.y + 200 - luciole1.height, 'luciole1');
            this.luciole1SpriteFX = this.add.particles('luciole1')//On charge les particules à appliquer au layer
            this.luciole1SpriteFX.createEmitter(this.configFX1)
            this.luciole1SpriteFX.x = this.luciole1Sprite.x
            this.luciole1SpriteFX.y = this.luciole1Sprite.y
        });



        this.luciole2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });


        map.getObjectLayer('Luciole2').objects.forEach((luciole2) => {
            this.luciole2Sprite = this.luciole2.create(luciole2.x, luciole2.y + 200 - luciole2.height, 'luciole2');
            this.luciole2SpriteFX = this.add.particles('luciole2')//On charge les particules à appliquer au layer
            this.luciole2SpriteFX.createEmitter(this.configFX2)
            this.luciole2SpriteFX.x = this.luciole2Sprite.x
            this.luciole2SpriteFX.y = this.luciole2Sprite.y
        });

        this.luciole3 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Luciole3').objects.forEach((luciole3) => {
            this.luciole3Sprite = this.luciole3.create(luciole3.x, luciole3.y + 200 - luciole3.height, 'luciole3');
            this.luciole3SpriteFX = this.add.particles('luciole3')//On charge les particules à appliquer au layer
            this.luciole3SpriteFX.createEmitter(this.configFX3)
            this.luciole3SpriteFX.x = this.luciole3Sprite.x
            this.luciole3SpriteFX.y = this.luciole3Sprite.y
        });

        this.luciole4 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Luciole4').objects.forEach((luciole4) => {
            this.luciole4Sprite = this.luciole4.create(luciole4.x, luciole4.y + 200 - luciole4.height, 'luciole4');
            this.luciole4SpriteFX = this.add.particles('luciole4')//On charge les particules à appliquer au layer
            this.luciole4SpriteFX.createEmitter(this.configFX4)
            this.luciole4SpriteFX.x = this.luciole4Sprite.x
            this.luciole4SpriteFX.y = this.luciole4Sprite.y
        });

        //Création du player et de toutes ses anims
        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);


        //anim de marche
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
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,
        });
        //anim de saut
        this.anims.create({
            key: 'jump',
            frames: [{key: 'player', frame: 'robo_player_1'}],
            frameRate: 10,
        });

        //On charge le dernier layer Tiled pour qu'il soit en premier plant !
        const platforms0 = map.createLayer('Plan1', tileset, 0,200);




        // on donne les collisions ou non
        platforms0.setCollisionByExclusion(-1, false);
        platforms1.setCollisionByExclusion(-1, true);
        platforms2.setCollisionByExclusion(-1, false);
        platforms3.setCollisionByExclusion(-1, false);
        platforms4.setCollisionByExclusion(-1, false);
        platforms5.setCollisionByExclusion(-1, false);

        // Qui collide avec quoi
        this.physics.add.collider(this.player, platforms1);


        //On ajoute la parallaxe pour les layers de tiles.
        platforms1.scrollFactorX=1; //SOL
        platforms0.scrollFactorX=1.03;//Bushes
        platforms2.scrollFactorX=0.95; //Bushes2
        platforms3.scrollFactorX=0.90; //MONTAGNES
        platforms4.scrollFactorX=0.87; //NUAGES
        platforms5.scrollFactorX=1; //CIEL

    }



}