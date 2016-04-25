(function ($) {

	function init ($parent) {
		var selector = "mr-include[src]";
		$parent.find(selector).addBack(selector).each(function () {
			var placeholder = $(this),
				url = placeholder.attr("src");
			include(placeholder).src(url);
		});
	}

	function include (element) {
		var $placeholder = $(element);
		return {
			src: function (url) {
				$.get(url, function (html) {
					var template = $(html).filter("*");
					$placeholder.replaceWith(template);
					template.each(function () {
						$(this).trigger("mr.include", $(this));
					});
				});
			}
		}
	}

	$(document).on("ready", function () {
		init($("body"))
	});

	$(document).on("mr.include", function (event) {
		init($(event.target));
	});
}(jQuery));