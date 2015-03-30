window.GameState = (function() {
	'use strict';

	var GameState = function(game) {
		this.game = game;
		this.score = 0;
		this.distance = 0;
		this.gameStarted = false;
		this.gameEnded = false;
		this.ground = $('#ground');
		this.pipes = new window.Pipes($('#pipes'), this);
	};
	GameState.prototype.onFrame = function(delta) {
		if(gameStarted) {
			distance += delta;
			if(distance) {

			}
			this.pipes.checkPipes();
		}
	};

	GameState.prototype.start = function() {
		this.gameStarted = true;
	}

	GameState.prototype.end = function() {
		if(this.score > this.game.bestscore) {
			this.game.bestscore = this.score;
		}
		this.gameEnded = true;
	}

	GameState.prototype.reset = function() {
		this.gameStarted = false;
		this.gameEnded = false;
		this.score = 0;
		this.distance = 0;
	};

	return Pipes;
})();
