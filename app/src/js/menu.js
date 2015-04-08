window.GameOverMenu = (function() {
	'use strict';

	var GameOverMenu = function(el, game) {
		this.el = el;
		this.game = game;
		this.resetB = $('#reset');
		this.backToMenuB = $('#backToMenu');
		this.newRecord = this.el.find('.newRecord');
	};

	GameOverMenu.prototype.display = function(isRecord) {
		isRecord = isRecord || false;
		this.el.show(400);
		if(this.isRecord) {
			this.newRecord.css('visibility', 'visible');
		}
		else {
			this.newRecord.css('visibility', 'hidden');
		}

		var that = this;
		this.resetB.one('click touchstart', function(event) {
			that.el.hide(400);
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
			that.game.gameState.bestScore = 0;
			that.el.fadeOut(250);
			that.game.startMainMenu();
		});
	};

	return GameOverMenu;
})();
