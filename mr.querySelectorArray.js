/*

	Как jQuery возвращает массив элементов по селектору. Ищет их внутри указанного
	родителя. Но! Добавляет в этот массив и самого родителя, если он удовлетворяет
	селектору.

	Возвращает обычный массив затем чтобы можно было как в jQuery перебирать его
	через стандартный Array.prototype.forEach().

	Зависит от
		- mr.matchSelector()

*/

mr.querySelectorArray = function (parentElement, selector, withSelf) {
	var mr = this,
		collection = Array.prototype.slice.call(parentElement.querySelectorAll(selector));
	if (withSelf) {
		if (mr.matchSelector(parentElement, selector)) {
			collection.push(parentElement);
		}
	}
	return collection;
};