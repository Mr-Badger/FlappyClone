
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('#game'));
    game.start();
});
