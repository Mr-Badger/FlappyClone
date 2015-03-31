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
		this.resetB.one('click touchstart', function() {
			that.el.hide();
			that.game.reset();
		});
		this.backToMenuB.one('click touchstart', function() {
			that.el.hide();
			that.game.startMainMenu();
		});
	};

	return GameOverMenu;
})();
