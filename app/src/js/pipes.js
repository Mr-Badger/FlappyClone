window.Pipes = (function() {
	'use strict';

	var Pipes = function(el, game) {
		this.el = el;
		this.game = game;
		this.pipes = [];
		this.lastSpawnTime = 1.8;
		this.spawnRate = 1.8;
	};

	Pipes.prototype.trySpawn = function(distance) {
		if(distance > this.lastSpawnTime + this.spawnRate) {
			this.lastSpawnTime = distance;
			this.spawnPipe();
		}
	};

	Pipes.prototype.spawnPipe = function() {
		var rand = 5 + Math.ceil(Math.random() * 30);
		var pipeSet = $('<div>').addClass('pipeSet').css('top', (rand+'em'));
		pipeSet.append($('<div>').addClass('pipe reverse'));
		pipeSet.append($('<div>').addClass('pipe'));
		this.pipes.push(pipeSet);
		this.el.append(pipeSet);
	};

	Pipes.prototype.checkPipe = function() {
		if(this.pipes.length > 0) {
			var left = this.pipes[0].children('.pipe:first').position().left;
			if(left < -98) {
				this.pipes.splice(0, 1);
				this.el.children(":first").remove();
			}
		}
	};

	Pipes.prototype.stop = function() {
		var that = this;
		$.each(this.pipes, function(i, pipeset) {
			$.each(pipeset.children(), function(i, pipe) {
				var $pipe = $(pipe);
				var pos = $pipe.position().left * 1/that.game.gameEM;
				$pipe.css('left', pos + 'em');
				$pipe.addClass('stop');
			});
		});
	};

	Pipes.prototype.reset = function() {
		this.lastSpawnTime = 1.8;
		this.pipes = [];
		this.el.empty();
	};

	return Pipes;
})();
