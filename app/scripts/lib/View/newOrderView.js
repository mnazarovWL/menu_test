App.newOrder = (function () {
	'use strict';
	return {
		calculate: function (arraysObj) {
			//names
			//qtys
			//costs
			//weights
			var object = {
				totalCost: 0,
				orderTime: new Date(),
				positions: []
			};
			var total = 0;
			var summary = 0;
			for (var i = 0; i < arraysObj.names.length; i++) {
				total = +arraysObj.costs[i].value * (+arraysObj.qtys[i].value);
				object.positions.push({
					name: arraysObj.names[i].value,
					quantity: arraysObj.qtys[i].value,
					weight: arraysObj.weights[i].value,
					posCost: arraysObj.costs[i].value,
					orderCost: total
				});
				summary += total;
			}
			object.totalCost = summary;
			return object;
		},
		createNewField: function (ev) {
			var btnElem = $(ev.target);
			var newElem = $('<div class="aligner-item"><input type="text" class="input-field" placeholder="name"><input type="text" class="weight-field" placeholder="weight"><input type="text" class="cost-field" placeholder="cost"><input type="text" class="counter-field" value="1" placeholder="qty"><button class="btn remover btn-danger glyphicon glyphicon-remove"></button></div>');
			newElem.insertBefore(btnElem);
		}
	};
})();
