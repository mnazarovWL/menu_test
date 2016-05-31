var App = {
	orderList: {}
};

App.orderList.init = function () {
	'use strict';
	App.request.get('partials/main.html').then(function (template) {
		App.view.fadeOut($('#wrapper'), function () {
			App.router.changeContent($('#wrapper'), template, App.orderList.main);
		});
	}, function (error) {
		console.error(error);
	});
};

App.orderList.main = function () {
	'use strict';
	App.eventHandler.bindEvent('click', '#accordion', '.pointer', App.orderList.removeItem);
	App.eventHandler.bindEvent('click', '#addNew', null, App.orderList.changeContent);
	App.eventHandler.bindEvent('click', '#localBtn', null, App.orderList.clearAll);
	if (App.storage.isExist()) {
		App.orderManager.set(App.storage.get());
		App.orderList.draw(App.orderManager.get());
	} else {
		App.request.get('assets/defaultOrders.json').then(function (defaultOrders) {
			App.orderManager.set(defaultOrders.orders);
			App.storage.set(defaultOrders.orders);
			App.orderList.draw(defaultOrders.orders);
		}, function (error) {
			console.error(error);
		});
	}
};


App.orderList.clearAll = function () {
	'use strict';
	App.view.confirmDialog('Are you sure you want to remove all the data?', function () {
		App.storage.clear();
		App.orderManager.clear();
		App.orderList.draw();
	});
};
App.orderList.draw = function (data) {
	'use strict';
	var tableData = App.mainView.createTables(data);
	App.mainView.insertTablesIntoPanels($('#accordion'), tableData);
	App.view.fadeIn($('#wrapper'));
};

App.orderList.removeItem = function (ev) {
	'use strict';
	var panelObj = App.mainView.getPanelElements($(ev.target));
	App.orderManager.removeAndRecalculate(panelObj.objectIndex, panelObj.positionIndex, function (params) {
		if (params.summary) {

			//getting a row removed
			App.mainView.setNewCost(panelObj.collapser, params.summary);
			App.view.remove(panelObj.row);
		} else {

			//getting a whole panel removed
			App.view.remove(panelObj.collapser);
			App.view.remove(panelObj.header);
		}
		App.storage.set(App.orderManager.get());
	});
};

App.orderList.changeContent = function () {
	'use strict';

	//removing event listeners before changing content
	App.eventHandler.unbindEvent('click', '#accordion', '.pointer', App.orderList.removeItem);
	App.eventHandler.unbindEvent('click', '#addNew', null, App.orderList.changeContent);
	App.eventHandler.unbindEvent('click', '#localBtn', null, App.orderList.clearAll);
	App.request.get('partials/order.html').then(function (template) {
		App.view.fadeOut($('#wrapper'), function () {
			App.router.changeContent($('#wrapper'), template, App.orderItem.main);
		}, function (error) {
			console.error(error);
		});
	});
};

$(document).ready(App.orderList.init);
