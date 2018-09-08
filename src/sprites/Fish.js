import { Phaser, GameObjects } from 'phaser';

/**
 * A general enemy for the game. Enemies should extend this.
 */
export default class extends GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.seal = this.scene.seal;
        this.scene.physics.add.collider(this, this.seal, this.getEaten, this.getEaten, this);
        this.body.velocity.y = 100;

        this.body.acceleration.y = 9.8;
        this.body.setAllowGravity(true);
        // this.body.setSize(50, 20);
        this.setScale(0.80, 0.80);
        this.eaten = false;
    }

    getEaten() {
        this.eaten = true;
    }

    update() {
        if (this.eaten) {
            this.scene.incrementScore();
            this.destoryFish();
        } else if (this.y > this.scene.height * 1.2) {
            this.destoryFish();
        }
    }

    destoryFish() {
        this.scene.fishies.remove(this);
        this.destroy();
    }
}
