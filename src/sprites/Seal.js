import Phaser from 'phaser';

/**
 * The protagonist of this game. Beloved by all.
 */
export default class Seal extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.alive = true;
        this.body.setCollideWorldBounds(true);
        this.setScale(.19, .19);
        // this.body.setSize(this.scene.width / 3, this.scene.height);

    }

    update(x) {
        this.x = x;
    }

    die() {
        this.alive = false;
    }
}
