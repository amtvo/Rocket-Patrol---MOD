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

