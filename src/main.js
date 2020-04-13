let config = {

    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [menu, play]
        //order is important, menu then play

};

let game = new Phaser.Game(config);

game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

//reserve keyboard variables
let keyF, keyLEFT, keyRIGHT;