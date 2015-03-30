window.mainMenu = (function() {
	'use strict';

	var mainMenu = function(el) {
		this.el = el;
		this.startB = $('#start');
		this.optionsB = $('#options');
	};

	mainMenu.prototype.display = function(callback) {
		var that = this.el;
		this.el.show();
		this.startB.one('click touchstart', function() {
			that.hide();
			callback();
		});
	};

	return mainMenu;
})();
