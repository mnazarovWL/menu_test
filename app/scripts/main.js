var App = {
	orderList: {}
};

App.orderList.main = function () {
	App.orderManager.init();
	App.orderList.createTableElements(App.orderManager.get());
	$('#accordion').on('click', '.pointer', App.orderList.removeItem);
	$('#addNew').on('click', App.orderList.addNewOrder);
};

App.orderList.addNewOrder = function () {
	window.location.href = 'http://localhost:9000/order.html';
}


App.orderList.createTableElements = function (data) {

	//creating a tables for orders
	var elementsArray = [];
	for (var i = 0; i < data.length; i++) {
		var dateTime = App.orderList.filterDate(new Date(data[i].orderTime));
		var dataElement = '<div class="col-md-8">';
		dataElement += '<table class="table table-condensed table-striped">';
		dataElement += '<tr><td>Time of order</td><td></td><td></td><td></td><td>' + dateTime + '</td></tr>';
		for (var j = 0; j < data[i].positions.length; j++) {
			dataElement += '<tr>';
			if (j === 0) {
				dataElement += '<td>Order</td>';
				dataElement += '<td>Weight</td>';
				dataElement += '<td>Qty</td>';
				dataElement += '<td>Cost</td>';
				dataElement += '<td>Total Cost</td></tr><tr>';
			}
			dataElement += '<td>' + data[i].positions[j].name + '</td>';
			dataElement += '<td>' + data[i].positions[j].weight + 'g</td>';
			dataElement += '<td>' + data[i].positions[j].quantity + '</td>';
			dataElement += '<td>' + data[i].positions[j].posCost + ' Ru</td>';
			dataElement += '<td>' + data[i].positions[j].orderCost + ' Ru</td>';
			dataElement += '<td><a class="pointer glyphicon glyphicon-remove" data-objectcounter="' + i + '"></a></td>';
			dataElement += '</tr>';
		}
		dataElement += '<tr>';
		dataElement += '<td><strong>Summary</strong></td><td></td><td></td><td></td><td><strong class="summary">' + data[i].totalCost + ' Ru</strong></td>';
		dataElement += '</tr>';
		dataElement += '</table>';
		dataElement += '</div>';
		elementsArray.push(dataElement);
	}
	App.orderList.insertOrders(elementsArray);
}

App.orderList.removeItem = function (ev) {

	//Delegating an event from remove mark to a panel, delegating is cool
	//dataset is the pointer to a object and position for removing without reloading
	//pointers and index need to maintain removing from storage, beside the actual index

	var objectPointer = $(ev.target).parents('.panel-collapse');
	var objectIndex = Math.floor(objectPointer.index() / 2);
	var positionPointer = null;
	var positionIndex = null;
	if (objectIndex === -1) {
		objectPointer = $(ev.target).parents('.panel-heading');
		objectIndex = Math.floor(objectPointer.index() / 2);
	} else {
		positionPointer = $(ev.target).parents('tr');
		positionIndex = positionPointer.index() - 2;
	}
	var dataset = ev.currentTarget.dataset;
	App.orderManager.removeAndRecalculate(objectIndex, positionIndex, function (params) {
		if (params.totalSum) {

			//getting a row removed
			var row = $(ev.currentTarget.parentNode.parentNode);
			var summaryElem = $('#collapse' + dataset.objectcounter + ' td:last-child > strong');
			summaryElem.html(params.totalSum + ' Ru');
			row.hide('slow', function () {
				row.remove();
			});
		} else {

			//getting a whole panel removed
			var collapse = $('#collapse' + dataset.objectcounter);
			var heading = $('#heading' + dataset.objectcounter);
			collapse.hide('slow', function () {
				collapse.remove();
			});
			heading.hide('slow', function () {
				heading.remove();
			});
		}
	});
}

App.orderList.insertOrders = function (array) {
	var allElements = [];

	//using the array of tables passed in, we wrap this into a panel view and insert to our page.
	for (var i = 0; i < array.length; i++) {

		//collapse and heading vars are for ID's
		var collapse = 'collapse' + i;
		var heading = 'heading' + i;
		var newElement = $('<div class="panel-heading" role="tab" id=' + heading + '><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href=#' + collapse + ' aria-expanded="false" aria-controls=' + collapse + '>Order ' + (i + 1) + ' </a><a class="pointer glyphicon glyphicon-remove" data-objectcounter="' + i + '"></a></h4></div><div id=' + collapse + ' class="panel-collapse collapse" role="tabpanel" aria-labelledby=' + heading + '><div class="panel-body">' + array[i] + '</div></div></div>');
		allElements.push(newElement);
		$('#accordion').html(allElements);
	}
}

App.orderList.filterDate = function (date) {

	//there are plenty of date filtering libs, bus we don't actually need them for a simple change, this would appear to a user in a familiar format
	var month = [];
	month[0] = 'January';
	month[1] = 'February';
	month[2] = 'March';
	month[3] = 'April';
	month[4] = 'May';
	month[5] = 'June';
	month[6] = 'July';
	month[7] = 'August';
	month[8] = 'September';
	month[9] = 'October';
	month[10] = 'November';
	month[11] = 'December';
	var mm = month[date.getMonth()];
	var dateTime = secondaryFilter(date.getDate()) + ' of ' + mm + ' ' + secondaryFilter(date.getHours()) + ':' + secondaryFilter(date.getMinutes());
	return dateTime;

	function secondaryFilter(day) {

		//just adds a zero to a single number of date: 7=>07, looks better
		if (+day < 10) {
			day = '0' + day;
		}
		return day;
	}
}


$(document).ready(App.orderList.main);
