App.eventHandler = (function () {
	'use strict';
	return {
		bindEvent: function (event, evObject, delegator, cb) {
			if (!delegator || delegator === null) {
				$(evObject).on(event, cb);
			} else {
				$(evObject).on(event, delegator, cb);
			}
		},
		unbindEvent: function (event, evObject, delegator, cb) {
			if (!delegator || delegator === null) {
				$(evObject).off(event, cb);
			} else {
				$(evObject).off(event, delegator, cb);
			}
		}
	};
})();
