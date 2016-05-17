//
// Mr. Utils
//

var mr = mr || {

	/*

	Сложившаяся система инициализации "компонентов" - с учётом иклюда *.html файлов
	в реальном времени. То есть инициализация проводится и когда "DOM ready" и когда
	инклюдится некий *.html.

	Инклюд <mr-include> генерит событие "include", которое и ловит данный инициализатор.

	*/
	component: function (selector) {
		var mr = this;
		return {
			init: function (callback) {
				$(document).on("ready", function () {
					$(document).find(selector).each(function () {
						if (!$(this).get(0).mrComponentReady) {
							callback($(this));
							$(this).get(0).mrComponentReady = true;
						}
					});
				});

				$(document).on("mr-include-complete", function (event) {
					$(event.target).find(selector).addBack(selector).each(function () {
						if (!$(this).get(0).mrComponentReady) {
							callback($(this));
							$(this).get(0).mrComponentReady = true;
						}
					});
				});
			}
		};
	}
};