App.view = (function () {
	'use strict';
	return {
		remove: function (target) {
			if (target instanceof jQuery) {
				target.hide('slow', function () {
					target.remove();
				});
			} else {
				var _target = $(target);
				_target.hide('slow', function () {
					_target.remove();
				});
			}
		},
		confirmDialog: function (msg, accepted, denied) {
			var res = confirm(msg);
			if (res) {
				if (accepted) {
					accepted();
				}
			} else {
				if (denied) {
					denied();
				}
			}
		},
		validateForEmptiness: function () {
			if (arguments.length) {
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i].length === 0) {
						return {
							success: false,
							error: 'There is no any orders'
						};
					}
					for (var j = 0; j < arguments[i].length; j++) {
						if (!arguments[i][j].value.replace(/\s/g, '')) {
							return {
								success: false,
								error: 'You need to fill all the fields'
							};
						}
					}
				}
				return {
					success: true
				};
			} else {
				console.error('wrong usage of validate function, called empty');
			}
		},
		validateForNaN: function () {
			if (arguments.length) {
				for (var i = 0; i < arguments.length; i++) {
					for (var j = 0; j < arguments[i].length; j++) {
						if (isNaN(arguments[i][j].value)) {
							return {
								success: false,
								error: 'Some of the data are invalid'
							};
						}
					}
				}
				return {
					success: true
				};
			} else {
				console.error('wrong usage of validate function, called empty');
			}
		},
		fadeOut: function (wrapper, hidedCallback) {
			wrapper.fadeOut('fast', function () {
				if (hidedCallback) {
					hidedCallback();
				}
			});
		},
		fadeIn: function (wrapper) {
			wrapper.fadeIn('fast');
		}
	};
})();
