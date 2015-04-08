window.MainMenu = (function() {
	'use strict';
	var that;

	var MainMenu = function(el, game) {
		that = this;
		this.el = el;
		this.game = game;
		this.startB = $('#start');
		this.tripB = $('#trippy');
	};

	MainMenu.prototype.display = function() {
		that.tripB.text('TRIP ' + (that.game.trippyBird ? 'ON' : 'OFF'));
		this.el.show();

		this.startB.one('click touchstart', function(event) {
			that.el.hide(700);
			if(event.type === 'touchstart') {
				setTimeout(function() {
					that.game.start();
				}, 100);
			}
			else {
				that.game.start();
			}

		});

		this.tripB.off('click touchstart');
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
