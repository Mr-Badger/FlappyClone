window.GameState = (function() {
	'use strict';

	var GameState = function(game) {
		this.game = game;
		this.score = 0;
		this.distance = 0;
		this.gameStarted = false;
		this.gameEnded = false;
		this.scoreN = $('#score');
		this.ground = $('#ground');
		this.pipes = new window.Pipes($('#pipes'));
	};

	GameState.prototype.onFrame = function(delta) {
		if(this.gameStarted) {
			if(!this.gameEnded) {
				this.distance += delta;
				this.pipes.trySpawn(this.distance);
				this.pipes.checkPipe();
			}
			var points = (this.distance - 3.7);
			if(points > 0) {
				var score = Math.floor(points / 1.8);
				if(score > this.score) {
					this.score = score;
					this.scoreN.text(score);
					if(this.game.sound) {
						this.game.scoreSound.play();
					}
				}
			}
		}

	};

	GameState.prototype.start = function() {
		this.gameStarted = true;
		this.scoreN.show();
	};

	GameState.prototype.end = function() {
		if(this.score > this.game.bestScore) {
			this.game.bestScore = this.score;
		}
		this.pipes.stop();
		this.ground.css('left', this.ground.position().left);
		this.ground.removeClass('slide');

		this.gameEnded = true;
		this.game.startGameOverMenu();
		this.scoreN.hide();
	};

	GameState.prototype.reset = function() {
		this.pipes.reset();
		this.gameStarted = false;
		this.gameEnded = false;
		this.score = 0;
		this.distance = 0;
		this.ground.addClass('slide');
		this.ground.css('left', 0);
		this.scoreN.text(0);
	};

	return GameState;
})();
