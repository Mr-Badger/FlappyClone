
window.Controls = (function() {
	'use strict';

	// Key codes.
	var KEYS = {
		32: 'space',
		38: 'up',
		77: 'mute'
	};

	//A singleton class which abstracts all player input.
	var Controls = function() {
		this.keys = {};
		$(window)
			.on('keydown', this._onKeyDown.bind(this))
			.on('keyup', this._onKeyUp.bind(this))
			.on('mousedown', this._onMouseDown.bind(this))
			.on('mouseup', this._onMouseUp.bind(this))
            .on('touchstart', this._onTouchStart.bind(this))
            .on('touchend', this._onTouchEnd.bind(this));
	};

	Controls.prototype.getKey = function(keyName) {
		return this.keys[keyName] || false;
	};

	Controls.prototype._onKeyDown = function(e) {
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

	Controls.prototype._onMouseDown = function() {
		this.keys['mouse'] = true;
	};

	Controls.prototype._onMouseUp = function() {
		this.keys['mouse'] = false;
	};

    Controls.prototype._onTouchStart = function() {
        this.keys['touch'] = true;
    };

    Controls.prototype._onTouchEnd = function() {
        this.keys['touch'] = false;
    };

	// Export singleton.
	return new Controls();
})();
