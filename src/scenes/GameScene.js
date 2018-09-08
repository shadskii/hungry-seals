import { Phaser, Scene } from 'phaser';
import Seal from '../sprites/Seal';
import Fish from '../sprites/Fish';

/**
 * This is the primary scene. The game is played during this scene.
 */
class GameScene extends Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        this.add.image(this.width / 2, this.height / 2, 'water').setScale(10, 2);
        this.platforms = this.physics.add.staticGroup();
        this.platforms
            .create(0, this.height, 'ground')
            .setScale(10, 0.5)
            .refreshBody();

        this.score = 0;
        this.scoreText = this.add.text(24, 24, '0', {
            fontSize: '32px',
            fill: '#fff',
        });

        this.seal = new Seal({
            scene: this,
            key: 'seal',
            x: this.width / 2,
            y: this.height,
        });
        this.x = this.width / 2;
        // Enemy generation
        this.fishies = this.add.group();
        this.time.addEvent({
            delay: 2000,
            callback: this.addFish,
            callbackScope: this,
            loop: true,
        });

        this.input.on('pointermove', (pointer) => {
            this.x = pointer.x;
        }, this);
    }

    update() {
        this.seal.update(this.x);
        this.fishies.children.entries.forEach((element) => {
            element.update();
        });
        if (!this.seal.alive) {
            this.scene.start('GameOverScene', { score: this.score });
        }
    }

    enemySpawnXValue() {
        let range = this.width * 0.9;
        let pad = this.width * 0.02;
        return Math.floor(Math.random() * range) + pad;
    }

    addFish() {
        this.fishies.add(
            new Fish({
                scene: this,
                key: 'fish',
                x: this.enemySpawnXValue(),
                y: -this.height / 4,
            })
        );
    }
    incrementScore() {
        this.score++;
        this.scoreText.setText(this.score);
    }
}

export default GameScene;
