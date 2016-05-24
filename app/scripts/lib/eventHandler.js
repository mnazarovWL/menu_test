App.eventHandler = (function () {
	'use strict';
	return {
		bindEvent: function (event, evObject, delegator, cb) {
			if (!delegator || delegator === null) {
				$(evObject).on(event, cb);
			} else {
				$(evObject).on(event, delegator, cb);
			}
		}
	};
})();
