
$(function() {
    'use strict';

    var game = new window.Game($('#game'));
	game.gameSound.loop = true;
	game.gameSound.play();
    game.mainMenuStart();
});
