window.Pipes = (function() {
	'use strict';

	var Pipes = function(el, gameState) {
		this.el = el;
		this.gameState = gameState;
		this.pipes = [];
		this.lastSpawnTime = 50;
		this.spawnRate = 50;
	};

	Pipes.prototype.trySpawn = function() {
		if(this.gameState.distance > this.lastSpawnTime + this.spawnRate) {
			this.lastSpawnTime = this.gameState.distance;
			spawnPipe();
		}
	}

	Pipes.prototype.spawnPipe = function() {
		var rand = Math.ceil(Math.random() * 30);
		var pipesSet = $('<div class="pipeSet"><div class="pipe reverse"></div><div class="pipe"></div></div>').css('top': rand+'em');
		this.pipes.push(pipeSet);
		this.el.append(pipesSet);
	};

	Pipes.prototype.checkPipe = function() {
		if(this.pipes.length > 0 && this.pipes[0].position().left == -100) {
			this.pipe.splice(0, 1);
			this.el.first().remove();
		}
	};

	Pipes.prototype.reset = function() {
		this.el.clear();
	};

	return Pipes;
})();
