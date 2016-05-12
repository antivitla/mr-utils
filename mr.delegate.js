/*

	Как делегирование jQuery

	Зависит от
		- mr.matchSelector()

*/

mr.delegate = function (rootElement, eventName, selector, callback) {
	rootElement.addEventListener(eventName, function (event) {
		var element = event.target;
		while (!mr.matchSelector(element, selector)) {
			element = element.parentElement;
			if (!element) {
				break;
			}
		}
		if (element) {
			callback.call(element, event);
		}
	});
};