var main = function () {
	orderManager.init();
	createTableElements(orderManager.get());
	$('#accordion').on('click', '.pointer', removeItem);
	$('#addNew').on('click', addNewOrder);
};

function createTableElements(data) {

	//creating a tables for orders
	var elements_array = [];
	for (var i = 0; i < data.length; i++) {
		var dateTime = filterDate(new Date(data[i].orderTime));
		var data_element = '<div class="col-md-8">';
		data_element += '<table class="table table-condensed table-striped">';
		data_element += '<tr><td>Time of order</td><td></td><td></td><td></td><td>' + dateTime + '</td></tr>';
		for (var j = 0; j < data[i].positions.length; j++) {
			data_element += '<tr>';
			if (j === 0) {
				data_element += '<td>Order</td>';
				data_element += '<td>Weight</td>';
				data_element += '<td>Qty</td>';
				data_element += '<td>Cost</td>';
				data_element += '<td>Total Cost</td></tr><tr>';
			}
			data_element += '<td>' + data[i].positions[j].name + '</td>';
			data_element += '<td>' + data[i].positions[j].weight + 'g</td>';
			data_element += '<td>' + data[i].positions[j].quantity + '</td>';
			data_element += '<td>' + data[i].positions[j].posCost + ' Ru</td>';
			data_element += '<td>' + data[i].positions[j].orderCost + ' Ru</td>';
			data_element += '<td><a class="pointer glyphicon glyphicon-remove" data-objectcounter="' + i + '" data-positioncounter="' + j + '"></a></td>';
			data_element += '</tr>';
		}
		data_element += '<tr>';
		data_element += '<td><strong>Summary</strong></td><td></td><td></td><td></td><td><strong class="summary">' + data[i].totalCost + ' Ru</strong></td>';
		data_element += '</tr>';
		data_element += '</table>';
		data_element += '</div>';
		elements_array.push(data_element);
	}
	insertOrders(elements_array, data);
}

function removeItem(ev) {

	//Delegating an event from remove mark to a panel, delegating is cool
	//dataset is the pointer to a object and position
	var dataset = ev.currentTarget.dataset;
	if (!dataset.positioncounter) {
		dataset.positioncounte = null;
	}
	orderManager.removeAndRecalculate(dataset.objectcounter, dataset.positioncounter, function (params) {
		if (params.totalSum) {

			//getting a row removed
			var row = $(ev.currentTarget.parentNode.parentNode);
			var summary_elem = $('#collapse' + dataset.objectcounter + ' td:last-child > strong');
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

function insertOrders(array, data) {
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

function filterDate(date) {

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


$(document).ready(main);

function addNewOrder() {
	window.location.href = "http://localhost:9000/order.html";
}
