var mr = window["mr"] || {};

/*

	Как jQuery $(selector).is

*/

mr.matchSelector = function (element, selector) {
	var elementClone = element.cloneNode(false),
		matches = parent(elementClone).querySelectorAll(selector),
		i = matches.length;
	while (--i >= 0 && matches.item(i) !== elementClone) ;
	return i > -1;

	// Wrap with document fragment
	function parent (element) {
		var parentElement = document.createDocumentFragment();
		parentElement.appendChild(element);
		return parentElement;
	}
};