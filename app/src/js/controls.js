
window.Controls = (function() {
	'use strict';

	// Key codes.
	var KEYS = {
		32: 'space',
		38: 'up',
		40: 'down'
	};

	//A singleton class which abstracts all player input.
	var Controls = function() {
		this.keys = {};
		$(window)
			.on('keydown', this._onKeyDown.bind(this))
			.on('keyup', this._onKeyUp.bind(this))
			.on('mousedown', this._onMouseClick.bind(this));
	};

	Controls.prototype._onKeyDown = function(e) {
		if (e.keyCode === 32 && !this.keys.space) {
			console.log('space');
		}

		// Remember that this button is down.
		if (e.keyCode in KEYS) {
			var keyName = KEYS[e.keyCode];
			this.keys[keyName] = true;
		}
	};

	Controls.prototype._onKeyUp = function(e) {
		if (e.keyCode in KEYS) {
			var keyName = KEYS[e.keyCode];
			this.keys[keyName] = false;
		}
	};

	Controls.prototype._onMouseClick = function(e) {
		console.log('down');
	};

	// Export singleton.
	return new Controls();
})();
