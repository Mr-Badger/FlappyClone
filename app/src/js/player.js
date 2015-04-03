window.Player = (function() {
	'use strict';
	var that;

	var Controls = window.Controls;

	var FLAP = 0.72;
	var INITIAL_POSITION_X = 20;
	var INITIAL_POSITION_Y = 25;
	var GRAVITY = 2;
	var MAXSPEED = 1.4;
	var birdClickRate = 200; //ms

	var Player = function(el, game, gameState) {
		that = this;
		this.el = el;
		this.game = game;
		this.gameState = gameState;
		this.bWidth = (1 / this.game.gameEM) * el.outerWidth();
		this.bHeight = (1 / this.game.gameEM) * el.outerHeight();
		this.reset();
	};

	Player.prototype.reset = function() {
		this.pos = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y };
		this.speed = 0;
		this.rot = 0;
		this.canFlap = true;
		this.hasCrashed = false;
		this.el.addClass('floating');
	};

	Player.prototype.onFrame = function(delta) {
		if(!this.gameState.gameStarted) {
			if(!this.checkStart()) {
 				return;
			}
		}

		if(!this.gameState.gameEnded) {
			this.checkInputs();

			var pipes = this.gameState.pipes.pipes;
			for(var i = 0; i < pipes.length; i++) {
				var offsetY = pipes[i].position().top;
				var pipeSet = pipes[i].children();
				for(var j = 0; j < pipeSet.length; j++) {
					var pipe = $(pipeSet[j]);
					pipe.rTop = pipe.position().top + offsetY;
					if(pipe.rTop < 0) {
						var offset = 5000;
						pipe.rTop -= offset;
						pipe.rHeight = pipe.outerHeight() + offset;
					}
					if(this.checkCollisionWithObject(pipe)) {
						this.gameState.end();
						return;
					}
				}
			}
		}
		else if(this.hasCrashed) {
			return;
		}

		this.setPositionAndRotation(delta);

		if(this.checkCollisionWithObject($('#ground'))) {
			this.hasCrashed = true;
			this.el.removeClass('flying');
			if(!this.gameState.gameEnded) {
				this.gameState.end();
			}
		}
	};

	Player.prototype.checkStart = function() {
		if(Controls.getKey('up') || Controls.getKey('space') || Controls.getKey('mouse') || Controls.getKey('touch')) {
			this.gameState.start();
			this.el.removeClass('floating');
			return true;
		}
		return false;
	};

	Player.prototype.checkInputs = function() {
		if (this.canFlap) {
			if(Controls.getKey('up') || Controls.getKey('space') || Controls.getKey('mouse') || Controls.getKey('touch')) {
				this.speed = -FLAP;
				this.canFlap = false;
				this.lastFlapped = new Date();
				this.game.sounds.play('wingSound');
			}
		}
		else {
			var timeNow = new Date().getTime();
			if(this.lastFlapped.getTime() + birdClickRate < timeNow) {
				this.canFlap = true;
			}
		}
	};

	/*Player.prototype.checkCollision = function() {

	};*/

	Player.prototype.setPositionAndRotation = function(delta) {
		if(this.gameState.gameEnded && this.speed < 0.7) {
			this.speed = 0.7;
		}

		this.speed += delta * GRAVITY;

		if(this.speed > MAXSPEED) {
			this.speed = MAXSPEED;
		}
		this.pos.y += this.speed;

		if(this.speed < 0.7) {
			this.rot = -20;
		}
		else {
			this.rot += 6;
		}

		if(this.rot > 90) {
			this.rot = 90;
		}

		if(this.rot > 60) {
			if(this.el.hasClass('flying')) {
				this.el.removeClass('flying');
			}
		}
		else if(!this.el.hasClass('flying')) {
			this.el.addClass('flying');
		}

		this.el.css('transform', 'translate3d(' + this.pos.x + 'em,' + this.pos.y + 'em, 0) rotateZ('+ this.rot +'deg)');
	};

	Player.prototype.checkCollisionWithObject = function(object) {
		var oPosition = object.position(),
			oX = (object.rLeft || oPosition.left) * (1/this.game.gameEM),
			oY = (object.rTop || oPosition.top) * (1/this.game.gameEM),
			oWidth = object.outerWidth() * (1/this.game.gameEM),
			oHeight = (object.rHeight || object.outerHeight()) * (1/this.game.gameEM);

		return ((this.pos.x < oX + oWidth) &&
				(this.pos.x + this.bWidth > oX) &&
				(this.pos.y < oY + oHeight) &&
				(this.pos.y + this.bHeight > oY));
	};

	return Player;
})();
