//Amber Vo

//create new scrolling sprite for background (10)
//display time remaining in seconds on screen (15)
//create new artwork for all in game assets (rocket, spaceship, explosion) (25)
//implement new timing/scoring mechanism that adds time to clock for successful hits (25)
//create new title screen (15)
//background music (10)
//total 100

let config = {

    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [music, menu, play]
        //order is important, menu then play

};

let game = new Phaser.Game(config);

game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

let scoreConfig = {
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

//reserve keyboard variables
let keyF, keyLEFT, keyRIGHT;

let countdownTimer;

let gameTimeSettings;

