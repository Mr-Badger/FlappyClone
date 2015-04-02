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
			that.game.sounds.toggleMute();
			that.optionsB.text('SOUND ' + (that.game.sounds.mute ? 'OFF' : 'ON'));
		});
	};

	return MainMenu;
})();
