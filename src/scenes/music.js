class music extends Phaser.Scene {
    constructor() {
        super("musicScene");
    }
    preload() {
        this.load.audio('bgMusic', './assets/BeepBox-Song.wav');
    }
    create() {
        let bgMusic = this.sound.add('bgMusic');
        bgMusic.play({
            loop: true
        });
        this.scene.start("menuScene");
    }
}