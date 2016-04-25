
//
// Mr. Include
//


(function () {
	mr.component("mr-include[src]").init(function (element) {
		replace(element).with(element.getAttribute("src"));
	});

	function replace(element) {
		// create ajax call to content
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (this.readyState != 4) {
				return;
			}

			// parse loaded to HTML dom
			var template, clone;
			template = document.createElement("template");
			template.innerHTML = this.response;
			if (template.content) {
				clone = document.importNode(template.content, true);
			} else {
				clone = template.cloneNode(true);
			}

			// save references to elements
			var refs = Array.prototype.slice.call(clone.children);

			// replace placeholder src loaded html in DOM
			element.parentElement.replaceChild(clone, element);

			// Trigger event on each loaded html immediate child
			refs.forEach(function (item) {
				mr.triggerEvent(item, "mr.include");
			});
		};

		return {
			with: function (contentUrl) {
				xhr.open("GET", contentUrl);
				xhr.send();
			}
		}
	}
}());


