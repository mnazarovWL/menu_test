var App = {
	orderItem: {}
};
App.orderItem.main = function () {
	'use strict';
	App.orderManager.init();
	$('#cancel').on('click', App.orderItem.cancelHandle);
	$('#submit').on('click', App.orderItem.validateAndCalculate);
	$('#add-more').on('click', App.orderItem.addMoreHandle);
	$('.fields').on('click', '.remover', App.orderItem.removeItem);
};

App.orderItem.cancelHandle = function () {
	var res = confirm('Are you sure, you want to exit?');
	if (res) {
		window.location.href = 'http://localhost:9000';
	}
}

App.orderItem.removeItem = function (ev) {
	var target = $(ev.currentTarget.parentNode);
	target.hide('slow', function () {
		target.remove();
	});
}


App.orderItem.addNewOrder = function (newOrder) {
	App.orderManager.add(newOrder);
	window.location.href = 'http://localhost:9000';
}

App.orderItem.validateAndCalculate = function () {
	var inputArr = $('input.input-field');
	if (inputArr.length === 0) {
		alert('There is no any orders');
		return;
	}
	var counterArr = $('input.counter-field');
	var costArr = $('input.cost-field');
	var weightArr = $('input.weight-field');
	var object = {
		totalCost: 0,
		orderTime: new Date(),
		positions: []
	};
	var total = 0;
	var summary = 0;
	for (var i = 0; i < inputArr.length; i++) {
		if (!(inputArr[i].value.replace(/\s/g, '') && counterArr[i].value.replace(/\s/g, '') && weightArr[i].value.replace(/\s/g, '') && costArr[i].value.replace(/\s/g, ''))) {
			alert('You need to fill all the fields');
			return;
		}
		if (isNaN(costArr[i].value) || isNaN(counterArr[i].value) || isNaN(weightArr[i].value)) {
			alert('Some of the data are invalid');
			return;
		}
		total = +costArr[i].value * (+counterArr[i].value);
		object.positions.push({
			name: inputArr[i].value,
			quantity: counterArr[i].value,
			weight: weightArr[i].value,
			posCost: costArr[i].value,
			orderCost: total
		});
		summary += total;
	}
	object.totalCost = summary;
	App.orderItem.addNewOrder(object);
}

App.orderItem.addMoreHandle = function () {
	var newElem = $('<div class="aligner-item"><input type="text" class="input-field" placeholder="name"><input type="text" class="weight-field" placeholder="weight"><input type="text" class="cost-field" placeholder="cost"><input type="text" class="counter-field" value="1" placeholder="qty"><button class="btn remover btn-danger glyphicon glyphicon-remove"></button></div>');
	newElem.insertBefore('#add-more');
}
$(document).ready(App.orderItem.main);
