window.mainMenu = (function() {
	'use strict';

	var mainMenu = function(el, game) {
		this.el = el;
		this.game = game;
		this.startB = $('#start');
		this.optionsB = $('#options');
	};

	mainMenu.prototype.display = function() {
		var that = this.el;
		this.el.show();
		var thatGame = this.game;
		this.startB.one('click touchstart', function() {
			that.hide();
			thatGame.start();
		});
		this.optionsB.one('click touchstart', function() {
			that.hide();
		});
	};

	return mainMenu;
})();
