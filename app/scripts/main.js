var App = {
	orderList: {}
};

App.orderList.main = function () {
	'use strict';
	App.eventHandler.bindEvent('click', '#accordion', '.pointer', App.orderList.removeItem);
	App.eventHandler.bindEvent('click', '#addNew', null, App.router.goToNewOrder);
	App.eventHandler.bindEvent('click', '#localBtn', null, App.orderList.clearAll);
	if (App.storage.isExist()) {
		App.orderManager.set(App.storage.get());
		App.orderList.draw(App.orderManager.get());
	} else {
		App.request.get('assets/defaultOrders.json', function (defaultOrders) {
			App.orderManager.set(defaultOrders);
			App.storage.set(defaultOrders);
			App.orderList.draw(defaultOrders);
		});
	}
};


App.orderList.clearAll = function () {
	App.view.confirmDialog('Are you sure you want to remove all the data?', function () {
		App.storage.clear();
		App.orderManager.clear();
		App.orderList.draw();
	});
};
App.orderList.draw = function (data) {

	var tableData = App.mainView.createTables(data);
	App.mainView.insertTablesIntoPanels(tableData);
};

App.orderList.removeItem = function (ev) {

	var panelObj = App.mainView.getPanelElements(ev.target);
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


$(document).ready(App.orderList.main);
