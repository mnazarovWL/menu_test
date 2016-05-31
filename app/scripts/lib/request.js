App.request = (function () {
	'use strict';
	//using promises for request
	return {
		get: function (url) {
			return new Promise(function (resolve, reject) {
				$.ajax({
					type: 'GET',
					url: url
				}).done(function (data) {
					if (data) {
						resolve(data);
					} else {
						reject();
					}
				});
			});
		}
	};
})();
