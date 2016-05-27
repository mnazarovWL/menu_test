App.router = (function () {
	'use strict';
	return {
		changeContent: function (partial, cb) {
			$('#wrapper').html(partial);
			if (cb) {
				cb();
			}
		},
		goTo: function (url) {
			window.location.href = url;
		}
	};
})();
