window.Pipes = (function() {
	'use strict';

	var Pipes = function(el, game) {
		this.el = el;
		this.game = game;
		this.lowerTop = 0;
		this.upperTop = 0;
	};

	Pipes.prototype.spawnPipes = function() {
		this.lowerTop = Math.ceil(Math.random() * 30);
		this.upperTop = this.lowerTop - 55;

		var pipeSet = window.document.createElement('div');
		pipeSet.className = 'pipeSet';
		var upperPipe = window.document.createElement('div');
		upperPipe.className = 'pipe reverse';
		upperPipe.style.top = this.upperTop + 'em';
		var lowerPipe = window.document.createElement('div');
		lowerPipe.className = 'pipe';
		lowerPipe.style.top = this.lowerTop + 'em';

		this.el.appendChild(pipeSet);
		pipeSet.appendChild(lowerPipe);
		pipeSet.appendChild(upperPipe);
	};

	Pipes.prototype.checkPipes = function() {
		var pipe = $('.pipe');
		var position = pipe.position();
		
		if(position !== undefined) {
			if(position.left < -90) {
				this.el.removeChild(this.el.childNodes[0]);
			}	
			pipe = $('.pipe');
			position = pipe.position();
			if(position !== undefined && position.left > 241 && position.left < 244) {
				this.game.score++;
			}
		}
	};

	return Pipes;

})();
