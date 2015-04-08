window.SoundsController = (function() {
	'use strict';

	var SoundsController = function() {
		this.hitSound = new Audio('src/sounds/sfx_hit.mp3');
		this.wingSound = new Audio('src/sounds/sfx_wing.mp3');
		this.deathSound = new Audio('src/sounds/sfx_die.mp3');
		this.scoreSound = new Audio('src/sounds/sfx_point.mp3');
		this.gameSound = new Audio('src/sounds/gameSound.mp3');
		this.highScoreSound = new Audio('src/sounds/tada.mp3');
		this.gameSound.loop = true;
		this.rate = 1;
		this.volume = 0.05;
		this.mute = true;
	};

	SoundsController.prototype.play = function(soundName, delay) {
		if(!this.mute) {
			var sound = this[soundName];
			sound.playbackRate = this.rate;
			sound.volume = this.volume;
			if(delay === undefined) {
				sound.play();
			}
			else {
				setTimeout(function() {
					sound.play();
				}, delay);
			}
		}
	};

	SoundsController.prototype.updateRate = function(delta) {
		var change = (Math.random() - 0.5) * delta * 5;
		var newRate = Math.min(Math.max(this.rate + change, 0.5), 2);
		this.setPlaybackRate(newRate);
	};

	SoundsController.prototype.setPlaybackRate = function(newRate) {
		this.rate = newRate;
		this.hitSound.playbackRate = newRate;
		this.wingSound.playbackRate = newRate;
		this.deathSound.playbackRate = newRate;
		this.scoreSound.playbackRate = newRate;
		this.gameSound.playbackRate = newRate;
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
