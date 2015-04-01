
$(function() {
	'use strict';

	var game = new window.Game($('#game'));
	game.startMainMenu();

	game.gameSound.loop = true;
});
