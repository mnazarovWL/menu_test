App.request = (function () {
	'use strict';
	return {
		get: function (url, cb) {
			$.ajax({
				type: 'GET',
				url: url
			}).done(function (data) {
				if (cb) {
					cb(data.orders);
				} else {
					return data.orders;
				}
			});
		}
	};
})();
