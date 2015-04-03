window.Game = (function() {
	'use strict';
	var that;

	//In ems
	var GAME_WIDTH = 48;
	var GAME_HEIGHT = 64;

	var Game = function(el) {
		that = this;
		this.el = el;
		this.firstTime = true;
		this.gameEM = 10;
		this.sounds = window.SoundsController;
		this.gameState = new window.GameState(this);
		this.player = new window.Player(this.el.find('#bird'), this, this.gameState);
		this.backGround = new window.BackgroundController(this.el.find('#background'), this, this.gameState);
		this.mainMenu = new window.MainMenu(this.el.find('#mainMenu'), this);
		this.gameOverMenu = new window.GameOverMenu(this.el.find('#gameover'), this);
		this.bestScore = 0;
		this.resizeGame();
		$(window).on('resize', this.resizeGame);
		// Cache a bound onFrame since we need it each frame.;
		this.onFrame = this.onFrame.bind(this);
		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.onFrame = function() {
		var now = new Date() / 1000,
			delta = now - this.lastFrame;
		this.lastFrame = now;

		this.player.onFrame(delta);
		this.gameState.onFrame(delta);
		this.backGround.onFrame(delta);

		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.start = function() {
		if(this.firstTime) {
			this.firstTime = false;
			this.gameState.reset();
			this.player.reset();
		}
		else {
			this.reset();
		}
	};

	Game.prototype.reset = function() {
		this.lastFrame = new Date() / 1000;
		this.player.reset();
		this.gameState.reset();
		this.backGround.reset();
	};

	Game.prototype.startMainMenu = function() {
		if(this.firstTime) {
			this.backGround.reset();
		}
		$("#topScore").text(this.bestScore);
		this.mainMenu.display();
	};

	Game.prototype.startGameOverMenu = function() {
		$("#finalScore").text(this.gameState.score);
		$("#bestScore").text(this.bestScore);
		this.gameOverMenu.display();
	};

	//Resizes the game too the biggest possible size
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

		that.player.el.addClass('fix');
		setTimeout(function() {
			that.player.el.removeClass('fix');
		}, 1);
	};

	return Game;
})();