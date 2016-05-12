/*

	Сложившаяся система инициализации "компонентов" - с учётом иклюда *.html файлов
	в реальном времени. То есть инициализация проводится и когда "DOM ready" и когда
	инклюдится некий *.html.

	Инклюд <mr-include> генерит событие "include", которое и ловит данный инициализатор.

	Использование: mr.component(".myClass #myID").init(function (element) {
		// some code
	});

	Зависит от
		- mr.querySelectorArray()

*/

mr.component = function (selector) {
	var mr = this;
	return {
		init: function (callback) {
			document.addEventListener("DOMContentLoaded", function () {
				mr.querySelectorArray(document.body, selector, true).forEach(callback);
			});

			document.addEventListener("mr.include", function (event) {
				mr.querySelectorArray(event.target, selector, true).forEach(callback);
			});
		}
	};
},