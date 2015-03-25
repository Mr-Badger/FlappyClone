window.Menu = (function() {
	'use strict';

	var Menu = function(el) {
		this.el = el;
		this.resetB = $('#reset');
		this.submitB = $('#submit');
	};

	Menu.prototype.display = function(callback) {
		var that = this.el;
		this.el.show();
		this.resetB.one('click', function() {
			that.hide();
			callback();
		});
	};

	return Menu;
})();
