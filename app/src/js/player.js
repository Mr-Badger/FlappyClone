window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	var SPEED = 30;
	var INITIAL_POSITION_X = 20;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.bWidth = 0.1 * el.outerWidth();
		this.bHeight = 0.1 * el.outerHeight();
		this.pos = { x: 0, y: 0 };
	};

	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		}

		//shitty linear gravity
		this.pos.y += 0.2;

		this.checkCollisionWithBounds();
		this.checkCollisionWithObject($('.ground'));

		var that = this;

		$('.pipeSet').each(function(key, item) {
			var pipeSet = $(item);
			var top = pipeSet.position().top;

			pipeSet.children('.pipe').each(function(key, item) {
				var pipe = $(item);
				pipe.rTop = pipe.position().top + top;
				that.checkCollisionWithObject(pipe);
			});
		});

		// Update position
		this.el.css('transform', 'translate3d(' + this.pos.x + 'em,' + this.pos.y + 'em, 0)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + this.bWidth > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + this.bHeight > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	Player.prototype.checkCollisionWithObject = function(object) {
		var oPosition = object.position(),
			oX = (object.rLeft || oPosition.left) * 0.1,
			oY = (object.rTop || oPosition.top) * 0.1,
			oWidth = object.outerWidth() * 0.1,
			oHeight = object.outerHeight() * 0.1;

		if ((this.pos.x < oX + oWidth) &&
			(this.pos.x + this.bWidth > oX) &&
			(this.pos.y < oY + oHeight) &&
			(this.pos.y + this.bHeight > oY)) {
			return this.game.gameover();
		}
	};


	return Player;

})();
