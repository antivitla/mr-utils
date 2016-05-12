/*

	Как jQuery $(selector).parents(selector) - но ищет пока только один

	Зависит от
		- mr.matchSelector()

*/

mr.findParent = function (element, selector) {
	var mr = this;
	while (!mr.matchSelector(element, selector)) {
		element = element.parentElement;
		if (!element) {
			break;
		}
	}
	if (element) {
		return element;
	}
};