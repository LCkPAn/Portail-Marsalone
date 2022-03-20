class TableauTiled extends Tableau1 {



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
        this.load.image('Emit1', 'assets/anims/Emit1.png');
        this.load.image('Emit2', 'assets/anims/Emit2.png');
        this.load.image('Emit3', 'assets/anims/Emit3.png');
        this.load.image('Emit4', 'assets/anims/Emit4.png');
        this.load.image('Emit5', 'assets/anims/Emit5.png');
        this.load.image('Emit6', 'assets/anims/Emit6.png');


        // At last image must be loaded with its JSON
        this.load.image('tiles', 'assets/tilesets/tilesheetFT.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/blockout.json');

    }



    create() {
        super.create();

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

        this.Emit3 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Etoiles').objects.forEach((Emit3) => {
            const Emit3Sprite = this.Emit3.create(Emit3.x, Emit3.y + 200 - Emit3.height, 'Emit3').setOrigin(0);
            Emit3Sprite.body.setSize(Emit3.width, Emit3.height).setOffset(0,0);
        });

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
            arbre4Sprite.body.setSize(arbre4.width, arbre4.height).setOffset(0,0);
            arbre4Sprite.scrollFactorX=0.97;
        });

        this.arbre3 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Arbre3').objects.forEach((arbre3) => {
            const arbre3Sprite = this.arbre3.create(arbre3.x, arbre3.y + 200 - arbre3.height, 'arbre3').setOrigin(0);
            arbre3Sprite.body.setSize(arbre3.width, arbre3.height).setOffset(0,0);
            arbre3Sprite.scrollFactorX=0.97;
        });

        this.arbre2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Arbre2').objects.forEach((arbre2) => {
            const arbre2Sprite = this.arbre2.create(arbre2.x, arbre2.y + 200 - arbre2.height, 'arbre2').setOrigin(0);
            arbre2Sprite.body.setSize(arbre2.width, arbre2.height).setOffset(0,0);
            arbre2Sprite.scrollFactorX=0.97;
        });

        this.arbre1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Arbre1').objects.forEach((arbre1) => {
            const arbre1Sprite = this.arbre1.create(arbre1.x, arbre1.y + 200 - arbre1.height, 'arbre1').setOrigin(0);
            arbre1Sprite.body.setSize(arbre1.width, arbre1.height).setOffset(0,0);
            arbre1Sprite.scrollFactorX=0.97;
        });

        this.Emit4 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('BrillanceArbre').objects.forEach((Emit4) => {
            const Emit4Sprite = this.Emit4.create(Emit4.x, Emit4.y + 200 - Emit4.height, 'Emit4').setOrigin(0);
            Emit4Sprite.body.setSize(Emit4.width, Emit4.height).setOffset(0,0);
        });

        this.Emit5 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('RoseeMatin').objects.forEach((Emit5) => {
            const Emit5Sprite = this.Emit5.create(Emit5.x, Emit5.y + 200 - Emit5.height, 'Emit5').setOrigin(0);
            Emit5Sprite.body.setSize(Emit5.width, Emit5.height).setOffset(0,0);
        });

        this.Emit1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Terre').objects.forEach((Emit1) => {
            const Emit1Sprite = this.Emit1.create(Emit1.x, Emit1.y + 200 - Emit1.height, 'Emit1').setOrigin(0);
            Emit1Sprite.body.setSize(Emit1.width, Emit1.height).setOffset(0,0);
        });

        this.luciole1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Luciole1').objects.forEach((luciole1) => {
            const luciole1Sprite = this.luciole1.create(luciole1.x, luciole1.y + 200 - luciole1.height, 'luciole1').setOrigin(0);
            luciole1Sprite.body.setSize(luciole1.width, luciole1.height).setOffset(0,0);
        });

        this.luciole2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Luciole2').objects.forEach((luciole2) => {
            const luciole2Sprite = this.luciole2.create(luciole2.x, luciole2.y + 200 - luciole2.height, 'luciole2').setOrigin(0);
            luciole2Sprite.body.setSize(luciole2.width, luciole2.height).setOffset(0,0);
        });

        this.luciole3 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Luciole3').objects.forEach((luciole3) => {
            const luciole3Sprite = this.luciole3.create(luciole3.x, luciole3.y + 200 - luciole3.height, 'luciole3').setOrigin(0);
            luciole3Sprite.body.setSize(luciole3.width, luciole3.height).setOffset(0,0);
        });

        this.luciole4 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Luciole4').objects.forEach((luciole4) => {
            const luciole4Sprite = this.luciole4.create(luciole4.x, luciole4.y + 200 - luciole4.height, 'luciole4').setOrigin(0);
            luciole4Sprite.body.setSize(luciole4.width, luciole4.height).setOffset(0,0);
        });

        const platforms1 = map.createLayer('Base', tileset, 0, 200);

        this.Emit2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('RefletEau').objects.forEach((Emit2) => {
            const Emit2Sprite = this.Emit2.create(Emit2.x, Emit2.y + 200 - Emit2.height, 'Emit2').setOrigin(0);
            Emit2Sprite.body.setSize(Emit2.width, Emit2.height).setOffset(0,0);
        });

        this.Emit6 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('PartSol').objects.forEach((Emit6) => {
            const Emit6Sprite = this.Emit6.create(Emit6.x, Emit6.y + 200 - Emit6.height, 'Emit6').setOrigin(0);
            Emit6Sprite.body.setSize(Emit6.width, Emit6.height).setOffset(0,0);
        });

        const platforms0 = map.createLayer('Plan1', tileset, 0, 200);

        // on donne les collisions ou non
        platforms0.setCollisionByExclusion(-1, false);
        platforms1.setCollisionByExclusion(-1, true);
        platforms2.setCollisionByExclusion(-1, false);
        platforms3.setCollisionByExclusion(-1, false);
        platforms4.setCollisionByExclusion(-1, false);
        platforms5.setCollisionByExclusion(-1, false);

        // Qui collide avec quoi
        this.physics.add.collider(this.player, platforms1);


        platforms1.scrollFactorX=1; //SOL
        platforms0.scrollFactorX=1.03;//Bushes
        platforms2.scrollFactorX=0.95; //Bushes2
        platforms3.scrollFactorX=0.90; //MONTAGNES
        platforms4.scrollFactorX=0.87; //NUAGES
        platforms5.scrollFactorX=1; //CIEL

    }



}