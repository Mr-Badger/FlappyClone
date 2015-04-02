window.SoundsController = (function() {
	'use strict';

	var SoundsController = function() {
		this.hitSound = new Audio('src/sounds/sfx_hit.ogg');
		this.wingSound = new Audio('src/sounds/sfx_wing.ogg');
		this.deathSound = new Audio('src/sounds/sfx_die.ogg');
		this.scoreSound = new Audio('src/sounds/sfx_point.ogg');
		this.gameSound = new Audio('src/sounds/gameSound.ogg');
		this.gameSound.loop = true;
		this.mute = true;
	};

	SoundsController.prototype.play = function(soundName, delay) {
		if(!this.mute) {
			if(delay === undefined) {
				this[soundName].play();
			}
			else {
				var sound = this[soundName];
				setTimeout(function() {
					sound.play();
				}, delay);
			}
		}
	};

	SoundsController.prototype.stop = function(soundName) {
		var sound = this[soundName];
		sound.pause();
		sound.currentTime = 0;
	};

	SoundsController.prototype.toggleMute = function() {
		this.mute = !this.mute;
		if(this.mute) {
			this.stop('gameSound');
		}
		else {
			this.play('gameSound');
		}
	};

	return new SoundsController();
})();
