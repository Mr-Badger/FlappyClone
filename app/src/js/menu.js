window.GameOverMenu = (function() {
	'use strict';

	var GameOverMenu = function(el, game) {
		this.el = el;
		this.game = game;
		this.resetB = $('#reset');
		this.backToMenuB = $('#backToMenu');
	};

	GameOverMenu.prototype.display = function() {
		this.el.show(400);

		var that = this;
		this.resetB.one('click touchstart', function(event) {
			that.el.hide(400);
			if(event.type === 'touchstart') {
				setTimeout(function() {
					that.game.reset();
				}, 100);
			}
			else {
				that.game.reset();
			}
		});
		this.backToMenuB.one('click touchstart', function() {
			that.game.gameState.bestScore = 0;
			that.el.fadeOut(250);
			that.game.startMainMenu();
		});
	};

	return GameOverMenu;
})();
