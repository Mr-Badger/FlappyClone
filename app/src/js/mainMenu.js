window.MainMenu = (function() {
	'use strict';
	var that;

	var MainMenu = function(el, game) {
		that = this;
		this.el = el;
		this.game = game;
		this.startB = $('#start');
		this.optionsB = $('#options');
		this.tripB = $('#trippy');
	};

	MainMenu.prototype.display = function() {
		this.optionsB.text('SOUND ' + (this.game.sounds.mute ? 'OFF' : 'ON'));
		that.tripB.text('TRIP ' + (that.game.trippyBird ? 'ON' : 'OFF'));
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

		this.tripB.on('click touchstart', function() {
			that.game.trippyBird = !that.game.trippyBird;
			that.game.el.toggleClass('trippy', that.game.trippyBird);
			that.tripB.text('TRIP ' + (that.game.trippyBird ? 'ON' : 'OFF'));
			if(!that.game.trippyBird) {
				that.game.sounds.setPlaybackRate(1);
			}
		});
	};

	return MainMenu;
})();
