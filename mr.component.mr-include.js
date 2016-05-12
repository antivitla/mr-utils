/*

	HTML элемент <mr-include>

	Инклюд с заменой

	Зависит от
		- mr.component

*/

mr.component("mr-include[src]").init(function (element) {
	mr.include(element, element.getAttribute("src"));
});


