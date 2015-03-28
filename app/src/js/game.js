
window.Game = (function() {
	'use strict';

	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('#bird'), this);
		this.menu = new window.Menu(this.el.find('#gameover'));
		this.isPlaying = false;
		this.distanceTraveled = 0;
		this.lastDistance = 0;
		this.score = 0;
		this.bestScore = 0;
		this.pipes = new window.Pipes(window.document.getElementsByClassName('pipes')[0], this);

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	Game.prototype.WORLD_WIDTH = 48.0;
	Game.prototype.WORLD_HEIGHT = 64.0;

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		var now = +new Date() / 1000,
			delta = now - this.lastFrame;
		this.lastFrame = now; 
		
		if (!this.isPlaying) {
			if(this.player.isFlying) {
				this.player.onFrame(delta);
				window.requestAnimationFrame(this.onFrame);
			}
			return;
		}

		this.distanceTraveled += 1;

		if(this.distanceTraveled - this.lastDistance === 200) {
			this.pipes.spawnPipes();
			this.lastDistance = this.distanceTraveled;
		}

		this.pipes.checkPipes();
		if(this.score > this.bestScore) {
			this.bestScore = this.score;
		}
		window.document.getElementById("score").innerHTML = this.score;
		window.document.getElementById("finalScore").innerHTML = this.score;
		window.document.getElementById("bestScore").innerHTML = this.bestScore;
		this.player.onFrame(delta);

		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	Game.prototype.reset = function() {
		this.player.reset();
	};

	Game.prototype.gameover = function() {
		this.isPlaying = false;

		var that = this;
		this.menu.display(function() {
			that.start();
		});
	};

	return Game;
})();