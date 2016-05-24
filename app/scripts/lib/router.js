App.router = (function () {
	'use strict';
	var homePage = 'http://localhost:9000';
	var newOrderPage = 'http://localhost:9000/order.html';
	return {
		goToHome: function () {
			window.location.href = homePage;
		},
		goToNewOrder: function () {
			window.location.href = newOrderPage;
		},
		goTo: function (url) {
			window.location.href = url;
		}
	};
})();
