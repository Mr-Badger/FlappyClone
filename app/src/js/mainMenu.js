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
			that.optionsB.off('click touchstart');
		});
		this.optionsB.on('click touchstart', function() {
			if(!that.game.sound) {
				that.optionsB.text('SOUND ON');
				that.game.sound = true;
				that.game.gameSound.play();
			}
			else {
				that.optionsB.text('SOUND OFF');
				that.game.sound = false;
				that.game.gameSound.pause();
				that.game.gameSound.currentTime = 0;
			}
		});
	};

	return MainMenu;
})();
