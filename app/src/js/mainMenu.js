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
		var options = this.optionsB;
		this.el.show();
		var thatGame = this.game;
		this.startB.on('click touchstart', function() {
			that.hide();
			thatGame.start();
		});
		this.optionsB.on('click touchstart', function() {
			if(thatGame.sound === false){
				thatGame.sound = true;
				thatGame.gameSound.play();
				options.html('SOUND ON');
			}
			else if(thatGame.sound === true){
				options.html('SOUND OFF');
				thatGame.sound = false;
				thatGame.gameSound.pause();
				thatGame.gameSound.currentTime = 0;
			}
		});
	};

	return mainMenu;
})();
