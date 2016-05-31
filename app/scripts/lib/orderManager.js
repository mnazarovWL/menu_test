App.orderManager = (function () {
	'use strict';
	var module = {};
	var orders = [];

	function calculate(singleOrder) {

		//in case of removing one dish, recalculating a summary cost
		var summary = 0;
		for (var i = 0; i < singleOrder.positions.length; i++) {
			summary += +singleOrder.positions[i].posCost * (+singleOrder.positions[i].quantity);
		}
		singleOrder.totalCost = summary;
		return summary;

	}
	module.clear = function () {
		orders = [];
	};
	module.set = function (newOrders) {
		orders = newOrders;
	};
	module.get = function (index) {
		if (index) {
			return orders[index];
		} else {
			return orders;
		}
	};
	module.add = function (newOrder) {
		orders.push(newOrder);
	};
	module.removeAndRecalculate = function (order, dish, cb) {

		//removing or a dish or a panel
		if (dish !== null && orders[order].positions.length > 1) {
			orders[order].positions.splice(dish, 1);
			var summary = calculate(orders[order]);
			if (cb) {
				cb({
					summary: summary
				});
			}
		} else {
			orders.splice(order, 1);
			if (cb) {
				cb({});
			}
		}
	};
	return module;
})();
