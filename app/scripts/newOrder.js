App.orderItem = {};
App.orderItem.main = function () {
	'use strict';
	if (App.storage.isExist()) {
		App.orderManager.set(App.storage.get());
	}
	App.eventHandler.bindEvent('click', '#cancel', null, App.orderItem.cancelHandle);
	App.eventHandler.bindEvent('click', '#submit', null, App.orderItem.validateAndCalculate);
	App.eventHandler.bindEvent('click', '#add-more', null, App.newOrder.createNewField);
	App.eventHandler.bindEvent('click', '.fields', '.remover', App.orderItem.removeItem);
	App.view.fadeIn();
};

App.orderItem.cancelHandle = function () {
	'use strict';
	App.view.confirmDialog('Are you sure, you want to exit?', App.orderItem.changeContent);
};

App.orderItem.removeItem = function (ev) {
	'use strict';
	var target = $(ev.currentTarget.parentNode);
	App.view.remove(target);
};


App.orderItem.addNewOrder = function (newOrder) {
	'use strict';
	App.orderManager.add(newOrder);
	App.storage.set(App.orderManager.get(), App.orderItem.changeContent);
};

App.orderItem.validateAndCalculate = function () {
	'use strict';
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

App.orderItem.changeContent = function () {
	'use strict';

	//removing event listeners before changing content
	App.eventHandler.unbindEvent('click', '#cancel', null, App.orderItem.cancelHandle);
	App.eventHandler.unbindEvent('click', '#submit', null, App.orderList.validateAndCalculate);
	App.eventHandler.unbindEvent('click', '#add-more', null, App.newOrder.createNewField);
	App.eventHandler.unbindEvent('click', '.fields', '.remover', App.orderItem.removeItem);
	App.request.get('partials/main.html', function (template) {
		App.view.fadeOut(function () {
			App.router.changeContent(template, App.orderList.main);
		});
	});
};
