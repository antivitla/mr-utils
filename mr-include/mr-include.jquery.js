(function ($) {
	function init ($item) {
		$item.data("mr-include", jQuery.extend($item.data("mr-include") || {}, { includes: 0 })); // track nested includes

		var selector = "mr-include[src]";
		$item.find(selector).addBack(selector).each(function () {
			var placeholder = $(this),
				url = placeholder.attr("src");

			$item.data("mr-include").includes += 1; // track nested includes

			include(placeholder).src(url, $item);
		});

		// track nested includes
		if ($item.data("mr-include").includes < 1) {
			$item.trigger(jQuery.Event("mr-include-complete"));
			if ($item.data("mr-include").parent) {
				$item.data("mr-include").parent.data("mr-include").includes -= 1;
				if ($item.data("mr-include").parent.data("mr-include").includes < 1) {
					$item.data("mr-include").parent.trigger(jQuery.Event("mr-include-complete"));
				}
			}
		}
	}

	function include (element) {
		var $placeholder = $(element);
		return {
			src: function (url, $parent) {
				$.get(url, function (html) {
					var template = $(html).filter("*");
					$placeholder.replaceWith(template);
					template.each(function () {
						$(this).data("mr-include", jQuery.extend($(this).data("mr-include") || {}, { parent: $parent })); // track nested includes
						$(this).trigger(jQuery.Event("mr-include"));
					});
				});
			}
		}
	}

	$(document).on("ready", function () {
		init($("body"))
	});

	$(document).on("mr-include", function (event) {
		init($(event.target));
	});
}(jQuery));