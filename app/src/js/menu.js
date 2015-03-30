window.Menu = (function() {
	'use strict';

	var Menu = function(el, game) {
		this.el = el;
		this.game = game;
		this.resetB = $('#reset');
		this.backToMenuB = $('#backToMenu');
	};

	Menu.prototype.display = function() {
		var that = this.el;
		this.el.show();
		var thatGame = this.game;
		this.resetB.one('click touchstart', function() {
			that.hide();
			thatGame.start();
		});
		this.backToMenuB.one('click touchstart', function() {
			that.hide();
			thatGame.mainMenuStart();
		});
	};

	return Menu;
})();
