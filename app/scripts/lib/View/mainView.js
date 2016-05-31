App.mainView = (function () {
	'use strict';

	function filterDate(date) {
		function dayNumberFilter(day) {

			//just adds a zero to a single number of date: 7=>07, looks better
			if (+day < 10) {
				day = '0' + day;
			}
			return day;
		}

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
		var dateTime = dayNumberFilter(date.getDate()) + ' of ' + mm + ' ' + dayNumberFilter(date.getHours()) + ':' + dayNumberFilter(date.getMinutes());
		return dateTime;
	}

	return {
		createTables: function (data) {
			if (!data) {
				return [];
			}

			//creating a tables for orders
			var elementsArray = [];
			for (var i = 0; i < data.length; i++) {
				var dateTime = filterDate(new Date(data[i].orderTime));
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
			return elementsArray;
		},
		insertTablesIntoPanels: function (mainPanel, array) {
			if (array.length === 0) {
				mainPanel.empty();
			}
			var allElements = [];

			//using the array of tables passed in, we wrap this into a panel view and insert to our page.
			for (var i = 0; i < array.length; i++) {

				//collapse and heading vars are for ID's
				var collapse = 'collapse' + i;
				var heading = 'heading' + i;
				var newElement = $('<div class="panel-heading" role="tab" id=' + heading + '><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href=#' + collapse + ' aria-expanded="false" aria-controls=' + collapse + '>Order ' + (i + 1) + ' </a><a class="pointer glyphicon glyphicon-remove" data-objectcounter="' + i + '"></a></h4></div><div id=' + collapse + ' class="panel-collapse collapse" role="tabpanel" aria-labelledby=' + heading + '><div class="panel-body">' + array[i] + '</div></div></div>');
				allElements.push(newElement);
			}
			mainPanel.html(allElements);
		},
		getPanelElements: function (target) {
			var _heading = null;
			var _collapse = null;
			var objectIndex = null;
			var row = null;
			var positionIndex = null;
			if (target.parents('.panel-collapse').length === 0) {
				_heading = target.parents('.panel-heading');
				_collapse = _heading.next();
			} else {
				_collapse = target.parents('.panel-collapse');
				_heading = _collapse.prev();
				row = target.parents('tr');
				positionIndex = row.index() - 2;
			}
			objectIndex = Math.floor(_heading.index() / 2);
			return {
				objectIndex: objectIndex,
				positionIndex: positionIndex,
				header: _heading,
				collapser: _collapse,
				row: row
			};
		},
		setNewCost: function (parent, newCost) {
			var summaryElem = parent.find('td:last-child > strong');
			summaryElem.html(newCost + ' Ru');
		}
	};
})();
