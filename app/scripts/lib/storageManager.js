App.storage = (function () {
	'use strict';
	var storage = window.localStorage;
	return {
		isExist: function () {
			//check if orders already exist in storage and if not, filling it with default
			if (storage.orders) {
				return true;
			} else {
				return false;
			}
		},
		get: function () {
			var orders = storage.getItem('orders');
			orders = JSON.parse(orders);
			return orders;
		},
		set: function (newOrders, cb) {
			try {
				storage.setItem('orders', JSON.stringify(newOrders));
			} catch (e) {
				console.log('error trying to setItem to storage ' + e);
				if (e == QUOTA_EXCEEDED_ERR) {
					alert('Превышен лимит');
				}
			}
			if (cb) {
				cb();
			}
		},
		clear: function (cb) {
			storage.clear();
			if (cb) {
				cb();
			}
		}
	};
})();
