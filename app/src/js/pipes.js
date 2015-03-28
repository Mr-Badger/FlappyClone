window.Pipes = (function() {
	'use strict';

	var Pipes = function(el) {
		this.el = el;
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

		var pipes = window.document.getElementsByClassName('pipes')[0];
		pipes.appendChild(pipeSet);
		pipeSet.appendChild(lowerPipe);
		pipeSet.appendChild(upperPipe);

		pipes.removeChild(pipes.childNodes[0]);
	};

	return Pipes;

})();
