window.MainMenu = (function() {
	'use strict';
	var that;

	var MainMenu = function(el, game) {
		that = this;
		this.el = el;
		this.game = game;
		this.startB = $('#start');
		this.optionsB = $('#options');
	};

	MainMenu.prototype.display = function() {
		this.optionsB.text('SOUND ' + (this.game.sounds.mute ? 'OFF' : 'ON'));
		this.el.show();

		this.startB.one('click touchstart', function() {
			that.el.hide();
			that.game.start();
			that.optionsB.off('click touchstart');
		});
		this.optionsB.on('click touchstart', function() {
			if(that.game.sounds.mute) {
				that.optionsB.text('SOUND ON');
				that.game.sounds.mute = false;
				that.game.sounds.play('gameSound');
			}
			else {
				that.optionsB.text('SOUND OFF');
				that.game.sounds.mute = true;
				that.game.sounds.stop('gameSound');
			}
		});
	};

	return MainMenu;
})();
