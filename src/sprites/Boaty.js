import Phaser from 'phaser';

/**
 * The protagonist of this game. Beloved by all.
 */
export default class Boaty extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.acceleration = 800;
        this.body.maxVelocity.x = 300;
        this.alive = true;
        this.body.setCollideWorldBounds(true);
    }

    update(x) {
        this.x = x;
    }

    jump() {
    }

    die() {
        this.alive = false;
    }
}
