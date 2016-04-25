//
// Mr. Utils
//

var mr = mr || {

	/*

	Сложившаяся система инициализации "компонентов" - с учётом иклюда *.html файлов
	в реальном времени. То есть инициализация проводится и когда "DOM ready" и когда
	инклюдится некий *.html.

	Инклюд <mr-include> генерит событие "include", которое и ловит данный инициализатор.

	Зависит от querySelectorArray

	Использование: mr.component(".myClass #myID").init(function (element) {
		// some code
	});

	*/
	component: function (selector) {
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

	/*

		Как jQuery возвращает массив элементов по селектору. Ищет их внутри указанного
		родителя. Но! Добавляет в этот массив и самого родителя, если он удовлетворяет
		селектору.

		Возвращает обычный массив затем чтобы можно было как в jQuery перебирать его
		через стандартный Array.prototype.forEach().

	*/

	querySelectorArray: function (parentElement, selector, withSelf) {
		var mr = this,
			collection = Array.prototype.slice.call(parentElement.querySelectorAll(selector));
		if (withSelf) {
			if (mr.matchSelector(parentElement, selector)) {
				collection.push(parentElement);
			}
		}
		return collection;
	},

	/*

		Как jQuery $(selector).is

	*/

	matchSelector: function (element, selector) {
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
	},

	/*

		Как jQuery $(selector).parents(selector) - но ищет пока только один

	*/

	findParent: function (element, selector) {
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
	},

	/*

		Как делегирование jQuery

	*/

	delegate: function (rootElement, eventName, selector, callback) {
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
	},

	/*

		Триггеринг события

	*/

	triggerEvent: function (element, type, options) {
		options = options || { bubbles: true, cancelable: true };
		var event;
		if (navigator.userAgent.match(/Trident/)) {
			event = document.createEvent("CustomEvent");
			event.initEvent(type, options.bubbles, options.cancelable, options.detail);
		} else {
			event = new CustomEvent(type, options);
		}
		element.dispatchEvent(event);
	}
};