
window.Game = (function() {
	'use strict';

	var Game = function(el) {
		this.el = el;
		this.gameState = new window.GameState(this);
		this.player = new window.Player(this.el.find('#bird'), this, this.gameState);
		this.mainMenu = new window.MainMenu(this.el.find('#mainMenu'), this);
		this.gameOverMenu = new window.GameOverMenu(this.el.find('#gameover'), this);
		this.bestScore = 0;
		this.gameStarted = false;
		this.sound = true;
		this.wingSound = window.document.getElementById('wingSound');
		this.deathSound = window.document.getElementById('deathSound');
		this.hitSound = window.document.getElementById('hitSound');
		this.scoreSound = window.document.getElementById('scoreSound');
		this.gameSound = window.document.getElementById('gameSound');

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	Game.prototype.WORLD_WIDTH = 48.0;
	Game.prototype.WORLD_HEIGHT = 64.0;

	Game.prototype.onFrame = function() {
		var now = +new Date() / 1000,
			delta = now - this.lastFrame;
		this.lastFrame = now;

		this.gameState.onFrame(delta);
		this.player.onFrame(delta);

		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.start = function() {
		if(!this.gameStarted) {
			window.requestAnimationFrame(this.onFrame);
			this.gameStarted = true;
		}
		this.reset();
	};

	Game.prototype.reset = function() {
		this.lastFrame = +new Date() / 1000;
		this.player.reset();
		this.gameState.reset();
	};

	Game.prototype.startMainMenu = function() {
		$("#topScore").text(this.bestScore);

		this.mainMenu.display();
	};

	Game.prototype.startGameOverMenu = function() {
		$("#finalScore").text(this.gameState.score);
		if(this.sound){
			this.hitSound.play();
			setTimeout(function () {
				this.deathSound.play();
			}, 400);
		}
		$("#bestScore").text(this.bestScore);

		this.gameOverMenu.display();
	};

	return Game;
})();