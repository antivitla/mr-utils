function delegate (rootElement, eventName, selector, callback) {
	rootElement.addEventListener(eventName, function (event) {
		var element = event.target;
		while (!matchSelector(element, selector)) {
			element = element.parentElement;
			if (!element) {
				break;
			}
		}
		if (element) {
			callback.call(element, event);
		}
	});
}