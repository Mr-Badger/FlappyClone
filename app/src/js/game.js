
window.Game = (function() {
	'use strict';

	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('#bird'), this);
		this.menu = new window.Menu(this.el.find('#gameover'), this);
		this.mainMenu = new window.mainMenu(this.el.find('#mainMenu'), this);
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

		if(this.distanceTraveled - this.lastDistance === 120) {
			this.pipes.spawnPipes();
			this.lastDistance = this.distanceTraveled;
		}

		this.pipes.checkPipes();
		if(this.score > this.bestScore) {
			this.bestScore = this.score;
		}
		$("#score").text(this.score);


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
		this.pipes.reset();
	};
	
	Game.prototype.mainMenuStart = function() {
		this.isPlaying = false;

		$("#topScore").text(this.bestScore);

		this.mainMenu.display();
	};

	Game.prototype.gameover = function() {
		this.isPlaying = false;

		$("#finalScore").text(this.score);
		$("#bestScore").text(this.bestScore);

		this.menu.display();
	};

	return Game;
})();