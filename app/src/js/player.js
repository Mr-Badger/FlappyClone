window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	var FLAP = 0.7;
	var INITIAL_POSITION_X = 20;
	var INITIAL_POSITION_Y = 25;
	var GRAVITY = 2;
	var MAXSPEED = 1.4;
	var birdClickRate = 200; //ms

	var Player = function(el, gameState) {
		this.el = el;
		this.gameState = gameState;
		this.bWidth = 0.1 * el.outerWidth();
		this.bHeight = 0.1 * el.outerHeight();
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

			var that = this;
			$('.pipeSet').each(function(key, item) {
				var pipeSet = $(item);
				var top = pipeSet.position().top;
				pipeSet.children('.pipe').each(function(key, item) {
					var pipe = $(item);
					pipe.rTop = pipe.position().top + top;
					if(pipe.rTop < 0) {
						var offset = 5000;
						pipe.rTop -= offset;
						pipe.rHeight = pipe.outerHeight() + offset;
					}
					if(that.checkCollisionWithObject(pipe)) {
						that.speed = 0.7;
						that.gameState.end();
						return;
					}
				});
			});
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
			oX = (object.rLeft || oPosition.left) * 0.1,
			oY = (object.rTop || oPosition.top) * 0.1,
			oWidth = object.outerWidth() * 0.1,
			oHeight = (object.rHeight || object.outerHeight()) * 0.1;

		return ((this.pos.x < oX + oWidth) &&
				(this.pos.x + this.bWidth > oX) &&
				(this.pos.y < oY + oHeight) &&
				(this.pos.y + this.bHeight > oY));
	};

	return Player;
})();
