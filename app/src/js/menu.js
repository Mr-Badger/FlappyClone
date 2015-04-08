window.GameOverMenu = (function() {
	'use strict';

	var GameOverMenu = function(el, game) {
		this.el = el;
		this.game = game;
		this.resetB = $('#reset');
		this.backToMenuB = $('#backToMenu');
	};

	GameOverMenu.prototype.display = function() {
		this.el.show();
		var that = this;
		this.resetB.one('click touchstart', function(event) {
			that.el.hide(700);
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
			that.el.hide();
			that.game.startMainMenu();
		});
	};

	return GameOverMenu;
})();
