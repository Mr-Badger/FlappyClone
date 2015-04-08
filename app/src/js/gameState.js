window.GameState = (function() {
	'use strict';

	var GameState = function(game) {
		this.game = game;
		this.score = 0;
		this.bestScore = 0;
		this.distance = 0;
		this.gameStarted = true;
		this.gameEnded = true;
		this.scoreN = $('#score');
		this.ground = $('#ground');
		this.pipes = new window.Pipes($('#pipes'), game);
	};

	GameState.prototype.onFrame = function(delta) {
		if(this.gameStarted && !this.gameEnded) {
			this.distance += delta;
			this.pipes.trySpawn(this.distance);
			this.pipes.cullPipes();

			var points = (this.distance - 3.7);
			if(points > 0) {
				var newscore = Math.floor(points / 1.8);
				if(newscore > this.score) {
					this.score = newscore;
					this.scoreN.text(newscore);
					this.game.sounds.play('scoreSound');
				}
			}
		}
	};

	GameState.prototype.start = function() {
		this.gameStarted = true;
		this.scoreN.show();
	};

	GameState.prototype.end = function() {
		this.game.sounds.play('hitSound');
		this.game.sounds.play('deathSound', 400);

		if(this.score > this.bestScore) {
			this.bestScore = this.score;
			if(this.bestScore > this.game.highScore) {
				this.game.highScore = this.bestScore;
				window.localStorage.setItem("bestScore", this.bestScore);
			}
		}
		this.pipes.stop();
		var pos = this.ground.position().left * 1/this.game.gameEM;
		this.ground.css('left', pos + 'em');
		this.ground.addClass('stop');

		this.gameEnded = true;
		this.game.startGameOverMenu();
		this.game.backGround.stop();
		this.scoreN.hide();
	};

	GameState.prototype.reset = function() {
		this.pipes.reset();
		this.gameStarted = false;
		this.gameEnded = false;
		this.score = 0;
		this.distance = 0;
		this.ground.removeClass('stop');
		this.ground.css('left', 0);
		this.scoreN.text(0);
	};

	return GameState;
})();
