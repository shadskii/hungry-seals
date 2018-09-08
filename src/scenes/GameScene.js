import { Phaser, Scene, SPACE } from 'phaser';
import Boaty from '../sprites/Boaty';
import Mine from '../sprites/Mine';
import Whale from '../sprites/Whale';
import Crab from '../sprites/Crab';
import Torpedo from '../sprites/Torpedo';
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

        this.boaty = new Boaty({
            scene: this,
            key: 'boaty',
            x: this.width / 8,
            y: this.height / 7,
        });
        this.x = this.width / 2;
        // Enemy generation
        this.enemies = this.add.group();
        this.time.addEvent({
            delay: 2000,
            callback: this.addMine,
            callbackScope: this,
            loop: true,
        });

        this.input.on('pointermove', (pointer) => {
            this.x = pointer.x;
        }, this);
        // Input controls
        this.isJump = false;
        this.input.on('pointerdown', (pointer) => {
            this.isJump = true;
        });
        this.input.on('pointerup', (pointer) => {
            this.isJump = false;
        });
        this.spaceJump = this.input.keyboard.addKey(SPACE);
    }

    update() {
        this.boaty.update(this.x);
        this.enemies.children.entries.forEach((element) => {
            element.update();
        });
        if (!this.boaty.alive) {
            this.scene.start('GameOverScene', { score: this.score });
        }
    }

    enemySpawnXValue() {
        let range = this.width * 0.9;
        let pad = this.width * 0.02;
        return Math.floor(Math.random() * range) + pad;
    }

    addMine() {
        this.enemies.add(
            new Fish({
                scene: this,
                key: 'mine',
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
