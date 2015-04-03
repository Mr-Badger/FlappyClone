window.SoundsController = (function() {
	'use strict';

	var SoundsController = function() {
		this.hitSound = new Audio('src/sounds/sfx_hit.mp3');
		this.wingSound = new Audio('src/sounds/sfx_wing.mp3');
		this.deathSound = new Audio('src/sounds/sfx_die.mp3');
		this.scoreSound = new Audio('src/sounds/sfx_point.mp3');
		this.gameSound = new Audio('src/sounds/gameSound.mp3');
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
		this.rate += change;
		this.rate = Math.min(Math.max(this.rate, 0.5), 2);
		this.setPlaybackRate(this.rate);
	};

	SoundsController.prototype.setPlaybackRate = function(val) {
		this.hitSound.playbackRate = val;
		this.wingSound.playbackRate = val;
		this.deathSound.playbackRate = val;
		this.scoreSound.playbackRate = val;
		this.gameSound.playbackRate = val;
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
