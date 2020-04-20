class play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        //load images
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('ship1', './assets/ship1.png');
        this.load.image('ship2', './assets/ship2.png');
        this.load.image('ship3', './assets/ship3.png');
        this.load.image('newStars', './assets/newStars.png');
        this.load.spritesheet('explosion', './assets/explosionAni-Sheet.png', {frameWidth: 64, frameHeight: 32,
        startFrame: 0, endFrame: 9});
    }

    create() {

        //for restarting timer when player restarts instead of going to the menu
        game.settings.gameTimer = gameTimeSettings;

        //place tile sprite
        this.newStars = this.add.tileSprite(0,0, 640, 480, 'newStars').
        setOrigin(0, 0);
        
        //make white borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0.0);
            //0x hex 
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0.0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0.0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0.0);

        //green ui background 
        this.add.rectangle(37, 42, 566, 64, 0x85ff93).setOrigin(0.0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').
        setScale(0.5, 0.5).setOrigin(0, 0);

        //add scapceship
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'ship1', 0, 30).
        setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'ship2', 0, 20).
        setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'ship3', 0, 10).
        setOrigin(0, 0);

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //score
        this.p1Score = 0;

        //display score
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        this.gameOver = false;

        //MOD - remaining time
        this.countdown = this.time.addEvent({ //TimerEventConfig --> Phaser Lib
            delay: 1000, 
            repeat: game.settings.gameTimer, //repeat every second depending on game settings
            callback: counting, //call function
            callbackScope: this
        });

        let countdownConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffda82',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        //MOD - display time
        countdownTimer = this.add.text(471, 54, game.settings.gameTimer/1000, countdownConfig);

    }

    update(){

        //press f -> restarts game
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }

        //press left -> goes to menu screen
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //scroll newStars
        this.newStars.tilePositionX -= 4;
            //moving backwards (-=) by 4 pixels

        if(!this.gameOver) {
            // update rocket
            this.p1Rocket.update();
            //update ship
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        //furthest ship, time +8 seconds
       if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            game.settings.gameTimer += 2000;
        }
        //middle ship, time +5 seconds
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            game.settings.gameTimer += 3000;
        }
        //closest ship, time +3 seconds
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            game.settings.gameTimer += 5000;
        }

        if(game.settings.gameTimer <= 0){
            //game over
            scoreConfig.fixedWidth = 0;
            countdownTimer.setText(0);
            //this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                //allows to be able to reset time, not static
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).
                setOrigin(0.5);
                this.gameOver = true;
        }

    }

    checkCollision(rocket, ship) {
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
                return true;
            }
            else {
                return false;
            }
    }

    shipExplode(ship){
        ship.alpha = 0; //hide the ship temorparily
        //explosion sprite where ship is
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); //explode animation
        boom.on('animationcomplete', () => { //callback after animation is complete
            ship.reset();
            ship.alpha = 1;     //make ship visible
            boom.destroy();     //remove explosion
        });
        //score
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }

}

function counting() {
    // -1 second, counting down
    game.settings.gameTimer -= 1000;
    //setting the text
    countdownTimer.setText(game.settings.gameTimer/1000);
}