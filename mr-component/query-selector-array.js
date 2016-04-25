function querySelectorArray (parentElement, selector, withSelf) {
	var collection = Array.prototype.slice.call(parentElement.querySelectorAll(selector));
	if (withSelf) {
		var matches = (parentElement.document || parentElement.ownerDocument).querySelectorAll(selector),
			i = matches.length;
		while (--i >= 0 && matches.item(i) !== parentElement) ;
		if (i > -1) {
			collection.push(parentElement);
		}
	}
	return collection;
}