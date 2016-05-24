var App = {
	orderItem: {}
};
App.orderItem.main = function () {
	'use strict';
	App.eventHandler.bindEvent('click', '#cancel', null, App.orderItem.cancelHandle);
	App.eventHandler.bindEvent('click', '#submit', null, App.orderItem.validateAndCalculate);
	App.eventHandler.bindEvent('click', '#add-more', null, App.newOrder.createNewField);
	App.eventHandler.bindEvent('click', '.fields', '.remover', App.orderItem.removeItem);
	if (App.storage.isExist()) {
		App.orderManager.set(App.storage.get());
	}
};

App.orderItem.cancelHandle = function () {
	App.view.confirmDialog('Are you sure, you want to exit?', App.router.goToHome);
};

App.orderItem.removeItem = function (ev) {
	var target = $(ev.currentTarget.parentNode);
	App.view.remove(target);
};


App.orderItem.addNewOrder = function (newOrder) {
	App.orderManager.add(newOrder);
	App.storage.set(App.orderManager.get(), App.router.goToHome());
};

App.orderItem.validateAndCalculate = function () {
	var check = App.view.validateForEmptiness($('input.input-field'), $('input.counter-field'), $('input.cost-field'), $('input.weight-field'));
	if (check.success) {
		check = App.view.validateForNaN($('input.counter-field'), $('input.cost-field'), $('input.weight-field'));
		if (check.success) {
			App.orderItem.addNewOrder(App.newOrder.calculate({
				names: $('input.input-field'),
				qtys: $('input.counter-field'),
				costs: $('input.cost-field'),
				weights: $('input.weight-field')
			}));
		} else {
			alert(check.error);
		}
	} else {
		alert(check.error);
	}
};

$(document).ready(App.orderItem.main);
