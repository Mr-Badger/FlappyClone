window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	var FLAP = 0.8;
	var INITIAL_POSITION_X = 20;
	var INITIAL_POSITION_Y = 25;
	var GRAVITY = 2;
	var MAXSPEED = 1.2;
	var birdClickRate = 150; //ms

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.bWidth = 0.1 * el.outerWidth();
		this.bHeight = 0.1 * el.outerHeight();
		this.pos = { x: 0, y: 0 };
		this.speed = 0;
		this.canFlap = true;
		this.rot = 0;
	};

	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.speed = 0;
		this.game.distanceTraveled = 0;
	};

	Player.prototype.onFrame = function(delta) {
		var that = this;

		if (this.canFlap) {
			if(Controls.getKey('up') || Controls.getKey('space') || Controls.getKey('mouse')) {
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

		this.speed += delta * GRAVITY;

		//Cap speed
		if(this.speed > MAXSPEED) {
			this.speed = MAXSPEED;
		}
		this.pos.y += this.speed;


		this.checkCollisionWithObject($('.ground'));
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
				that.checkCollisionWithObject(pipe);
			});
		});

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
			this.el.removeClass('flying');
		}
		else {
			this.el.addClass('flying');
		}

		// Update position
		this.el.css('transform', 'translate3d(' + this.pos.x + 'em,' + this.pos.y + 'em, 0) rotateZ('+ this.rot +'deg)');
	};

	Player.prototype.checkCollisionWithObject = function(object) {
		var oPosition = object.position(),
			oX = (object.rLeft || oPosition.left) * 0.1,
			oY = (object.rTop || oPosition.top) * 0.1,
			oWidth = object.outerWidth() * 0.1,
			oHeight = (object.rHeight || object.outerHeight()) * 0.1;

		if ((this.pos.x < oX + oWidth) &&
			(this.pos.x + this.bWidth > oX) &&
			(this.pos.y < oY + oHeight) &&
			(this.pos.y + this.bHeight > oY)) {
			return this.game.gameover();
		}
	};


	return Player;

})();
