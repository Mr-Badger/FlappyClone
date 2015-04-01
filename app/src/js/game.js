window.Game = (function() {
	'use strict';
	var that;

	var Game = function(el) {
		that = this;
		this.el = el;
		this.gameEM = 10;
		this.gameState = new window.GameState(this);
		this.player = new window.Player(this.el.find('#bird'), this, this.gameState);
		this.mainMenu = new window.MainMenu(this.el.find('#mainMenu'), this);
		this.gameOverMenu = new window.GameOverMenu(this.el.find('#gameover'), this);
		this.bestScore = 0;
		this.gameStarted = false;
		this.sound = false;
		this.wingSound = window.document.getElementById('wingSound');
		this.deathSound = window.document.getElementById('deathSound');
		this.hitSound = window.document.getElementById('hitSound');
		this.scoreSound = window.document.getElementById('scoreSound');
		this.gameSound = window.document.getElementById('gameSound');

		this.resizeGame();
		$(window).on('resize', this.resizeGame);
		// Cache a bound onFrame since we need it each frame.;
		this.onFrame = this.onFrame.bind(this);
	};

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

	Game.prototype.resizeGame = function() {
		var widthR = $(window).width()/48;
		var heightR = $(window).height()/64;
		var newEM = Math.min(widthR, heightR);
		var offset;
		that.gameEM = newEM;
		that.el.css('font-size', newEM+'px');
		if(widthR > heightR) {
			offset = ($(window).width() - (newEM * 48))/2;
			that.el.css('margin-left', offset +'px');
			that.el.css('margin-top', 0);
		}
		else {
			offset = ($(window).height() - (newEM * 64))/2;
			that.el.css('margin-top', offset + 'px');
			that.el.css('margin-left', 0);
		}
	};

	return Game;
})();