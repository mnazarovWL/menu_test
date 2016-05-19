var main = function () {
	orderManager.init();
	$('#cancel').on('click', cancelHandle);
	$('#submit').on('click', validateAndCalculate);
	$('#add-more').on('click', addMoreHandle);
	$('.fields').on('click', '.remover', removeItem);
};
$(document).ready(main);

function cancelHandle() {
	var res = confirm('Are you sure, you want to exit?');
	if (res) {
		window.location.href = "http://localhost:9000";
	}
}

function removeItem(ev) {
	var target = $(ev.currentTarget.parentNode);
	target.hide('slow', function () {
		target.remove();
	});
}


function addNewOrder(newOrder) {
	orderManager.add(newOrder);
	window.location.href = "http://localhost:9000";
}

function validateAndCalculate() {
	var inputArr = $('input.input-field');
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
			alert("Some of the data are invalid");
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
	addNewOrder(object);
}

function addMoreHandle() {
	var new_element = $('<div class="aligner-item"><input type="text" class="input-field" placeholder="name"><input type="text" class="weight-field" placeholder="weight"><input type="text" class="cost-field" placeholder="cost"><input type="text" class="counter-field" value="1" placeholder="qty"><button class="btn remover btn-danger glyphicon glyphicon-remove"></button></div>');
	new_element.insertBefore('#add-more');
}
