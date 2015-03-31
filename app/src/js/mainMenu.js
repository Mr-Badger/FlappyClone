window.MainMenu = (function() {
	'use strict';

	var MainMenu = function(el, game) {
		this.el = el;
		this.game = game;
		this.startB = $('#start');
		this.optionsB = $('#options');
	};

	MainMenu.prototype.display = function() {
		this.el.show();
		var that = this;
		this.startB.one('click touchstart', function() {
			that.el.hide();
			that.game.start();
		});
		this.optionsB.one('click touchstart', function() {
			that.el.hide();
		});
	};

	return MainMenu;
})();
