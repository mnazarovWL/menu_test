var orderManager = (function () {
	'use strict';
	var module = {};
	var storage = window.sessionStorage;
	var orders;
	var defaultOrders = [{
		'totalCost': '6200',
		'orderTime': '2016-04-07T12:00:00',
		'positions': [{
			'name': 'Baked duck',
			'quantity': '2',
			'weight': '800',
			'posCost': '2000',
			'orderCost': '4000'
		}, {
			'name': 'French fries',
			'quantity': '4',
			'weight': '200',
			'posCost': '400',
			'orderCost': '1600'
		}, {
			'name': 'Orange juice',
			'quantity': '1',
			'weight': '1000',
			'posCost': '600',
			'orderCost': '600'
		}]
	}, {
		'totalCost': '8900',
		'orderTime': '2016-04-06T11:33:12',
		'positions': [{
			'name': 'Fork steak',
			'quantity': '1',
			'weight': '1200',
			'posCost': '2500',
			'orderCost': '2500'
		}, {
			'name': 'Caesar salad',
			'quantity': '3',
			'weight': '400',
			'posCost': '1600',
			'orderCost': '4800'
		}, {
			'name': 'Duff bear',
			'quantity': '1',
			'weight': '500',
			'posCost': '700',
			'orderCost': '700'
		}, {
			'name': 'Allegrini Soave white wine',
			'quantity': '2',
			'weight': '150',
			'posCost': '450',
			'orderCost': '900'
		}]
	}, {
		'totalCost': '151200',
		'orderTime': '2016-04-07T08:15:16',
		'positions': [{
			'name': 'Taco',
			'quantity': '1',
			'weight': '650',
			'posCost': '1200',
			'orderCost': '1200'
		}, {
			'name': 'Glass of water',
			'quantity': '1',
			'weight': '250',
			'posCost': '150000',
			'orderCost': '150000'
		}]
	}, {
		'totalCost': '6800',
		'orderTime': '2016-01-01T03:00:00',
		'positions': [{
			'name': 'The cat shawerma',
			'quantity': '4',
			'weight': '800',
			'posCost': '1700',
			'orderCost': '6800'
		}]
	}];

	function calculate(singleOrder, cb) {

		//in case of removing one dish, recalculating a summary cost
		var summary = 0;
		for (var i = 0; i < singleOrder.positions.length; i++) {
			summary += +singleOrder.positions[i].posCost * (+singleOrder.positions[i].quantity);
		}
		singleOrder.totalCost = summary;
		if (cb) {
			cb({
				totalSum: summary
			});
		}

	}

	module.init = function (data) {

		//check if orders already exist in storage and if not, filling it with default
		if (storage.orders) {
			orders = storage.getItem('orders');
			orders = JSON.parse(orders);
		} else {
			storage.setItem('orders', JSON.stringify(defaultOrders));
			orders = storage.getItem('orders');
			orders = JSON.parse(orders);
		}
	};
	module.set = function (cb) {
		storage.setItem('orders', JSON.stringify(orders));
		orders = storage.getItem('orders');
		orders = JSON.parse(orders);
		if (cb) {
			cb({});
		}
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
		this.set();
	};
	module.removeAndRecalculate = function (order, dish, cb) {

		//removing or a dish or a panel
		if (dish && orders[order].positions.length > 1) {
			orders[order].positions.splice(dish, 1);
			calculate(orders[order], cb);
			this.set();
		} else {
			orders.splice(order, 1);
			this.set(cb);
		}
	};
	return module;
})();
