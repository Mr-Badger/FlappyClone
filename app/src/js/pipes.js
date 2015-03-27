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

		//TODO animate the pipes
	};

	return Pipes;

})();
