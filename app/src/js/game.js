window.Game = (function() {
	'use strict';
	var that;
	//In ems
	var GAME_WIDTH = 48;
	var GAME_HEIGHT = 64;

	var Game = function(el) {
		that = this;
		this.el = el;
		this.gameEM = 10;
		this.gameState = new window.GameState(this);
		this.player = new window.Player(this.el.find('#bird'), this, this.gameState);
		this.backGround = new window.BackgroundController(this.el.find('#background'), this, this.gameState);
		this.mainMenu = new window.MainMenu(this.el.find('#mainMenu'), this);
		this.gameOverMenu = new window.GameOverMenu(this.el.find('#gameover'), this);
		this.bestScore = 0;
		this.sound = false;
		this.hitSound = window.document.getElementById('hitSound');
		this.wingSound = window.document.getElementById('wingSound');
		this.deathSound = window.document.getElementById('deathSound');
		this.scoreSound = window.document.getElementById('scoreSound');
		this.gameSound = window.document.getElementById('gameSound');
		this.gameSound.loop = true;
		this.resizeGame();
		$(window).on('resize', this.resizeGame);
		// Cache a bound onFrame since we need it each frame.;
		this.onFrame = this.onFrame.bind(this);
		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.onFrame = function() {
		var now = +new Date() / 1000,
			delta = now - this.lastFrame;
		this.lastFrame = now;

		this.player.onFrame(delta);
		this.gameState.onFrame(delta);
		this.backGround.onFrame(delta);

		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.start = function() {
		this.reset();
	};

	Game.prototype.reset = function() {
		this.lastFrame = +new Date() / 1000;
		this.player.reset();
		this.gameState.reset();
		this.backGround.reset();
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
		var widthR = $(window).width() / GAME_WIDTH;
		var heightR = $(window).height() / GAME_HEIGHT;
		var newEM = Math.min(widthR, heightR);
		that.gameEM = newEM;
		that.el.css('font-size', newEM+'px');
		var offset;
		if(widthR > heightR) {
			offset = ($(window).width() - (newEM * GAME_WIDTH)) / 2;
			that.el.css('margin-left', offset +'px');
			that.el.css('margin-top', 0);
		}
		else {
			offset = ($(window).height() - (newEM * GAME_HEIGHT)) / 2;
			that.el.css('margin-top', offset + 'px');
			that.el.css('margin-left', 0);
		}
	};

	return Game;
})();