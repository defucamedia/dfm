function handlePages() {
	var $pageList = $("ol.pages");
	var pages = $pageList.children("li").length;

	if (pages < 2)
		return;

	var pager = "<span class=\"pager\">";

	for (var i = 0; i < pages; i++)
		pager += "<a href=\"#\"" + (i == 0 ? "class=\"current\"" : "") + ">" + (i % 2 == 0 ? "&#9660;" : "&#9650;") + "</a>";

	pager += "</span>";
	$pageList.closest("div").before(pager);

	$("span.pager a").click(function() {
		var $this = $(this);
		var index = $this.index();
		var $pageList = $this.parent().next().children("ol");

		$this.siblings().removeClass("current");
		$this.addClass("current");
		
		$pageList.children(":visible").fadeOut(500, function() {
			$pageList.children(":eq(" + index + ")").fadeIn();
		});
		
		return false;
	});
}

$(function() {
	handlePages();
});
