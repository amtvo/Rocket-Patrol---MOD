class menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){
        //audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');

        //title screen picture
        this.load.image('titleStars', './assets/titleStars.png');
    }

    create() {

        this.titleStars = this.add.tileSprite(0,0, 640, 480, 'titleStars').
        setOrigin(0, 0);

        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            //backgroundColor: '#F3B141',
            color: '#ffda82',
            aligh: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //display menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
        let textSpacer2 = 45;
       
        this.add.text(centerX, centerY, 'Use <--> arrows to move & (F) to Fire', menuConfig).setOrigin(0.5);

        this.add.text(centerX + textSpacer, centerY + textSpacer + textSpacer2, '+30 points, +5 seconds', menuConfig).setOrigin(0.5);
        this.add.text(centerX + textSpacer, centerY + textSpacer + textSpacer2 * 2, '+20 points, +3 seconds', menuConfig).setOrigin(0.5);
        this.add.text(centerX + textSpacer, centerY + textSpacer + textSpacer2 * 3, '+10 points, +2 seconds', menuConfig).setOrigin(0.5);

        menuConfig.color = '#85ff93';
        this.add.text(centerX, centerY + textSpacer, 'Press <- for Easy or -> for Hard', menuConfig).setOrigin(0.5);
        
        menuConfig.fontSize = '40px';
        this.add.text(centerX, centerY - textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);

        //keys --> borrowed form play.js
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //play background music when game setings is selected

    }


    update() {

        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
           gameTimeSettings = 60000;
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            gameTimeSettings = 45000;
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}
