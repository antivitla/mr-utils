function findParent (element, selector) {
	while (!matchSelector(element, selector)) {
		element = element.parentElement;
		if (!element) {
			break;
		}
	}
	if (element) {
		return element;
	}
}