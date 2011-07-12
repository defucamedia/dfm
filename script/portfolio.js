var portfolioTimeout;
var currentProject = 0;
var currentBg = 0;
var bgTime = 5000;
var $pageList;
var $slider;

function folioTimeout(time) {
	portfolioTimeout = setTimeout(function() {
		var animateTo = "0";
		var action = "removeClass";

		if (!$slider.hasClass("down"))
		{
			animateTo = "-" + ($pageList.height() - 10) + "px";
			action = "addClass";
		}
		$slider.animate({"bottom" : animateTo}, 500)[action]("down");
	}, time);
}

function handleBgs() {
	bgInterval = setInterval(function() {
		transition();
	}, bgTime);

	var pages = getBgSet(currentProject).length

	if (pages < 2)
		return;
	
	setPager(pages);
	currentBg = 0;

	$("span.pager a").live("click", function() {
		var $this = $(this);
		var index = $this.index();

		clearInterval(bgInterval);
		currentBg = index;
		transition();
		bgInterval = setInterval(function() {
			transition();
		}, bgTime);

		$this.addClass("current").siblings().removeClass("current");
		
		return false;
	});

	transition();
}

function setPager(pages) {
	if (!pages)
		pages = getBgSet(currentProject).length;

	$pager = $(".pager");
	if ($pager.length > 0)
		$pager.remove();

	var pager = "<span class=\"pager\">";

	for (var i = 0; i < pages; i++)
		pager += "<a href=\"#\"" + (i == 0 ? "class=\"current\"" : "") + ">" + (i % 2 == 0 ? "&#9660;" : "&#9650;") + "</a>";

	pager += "</span>";
	$pageList.closest("div").before(pager);
}

function handlePages() {
	var pages = $pageList.children("li").length;

	if (pages < 2)
		return;

	$("#next").click(function() {
		var $active = $pageList.children(":visible");
		var index = $active.index() + 1;
		
		if (index == $pageList.children().length)
			index = 0;

		$slider.stop().animate({"bottom" : "-" + $pageList.closest("div").outerHeight() + "px"}, 500, function() {
			$active.hide();
			$pageList.children(":eq(" + index + ")").show();
			$slider.css("bottom", "-" + ($pageList.height() - 10) + "px")
			       .animate({"bottom" : "0"}, 500)
			       .removeClass("down");
		}).addClass("down");

		currentProject = index;
		currentBg = 0;
		clearTimeout(portfolioTimeout);
		setPager();
		transition();
		folioTimeout(bgTime);

		return false;
	});

	$("#previous").click(function() {
		var $active = $pageList.children(":visible");
		var index = $active.index() - 1;
		
		if (index < 0)
			index = $pageList.children().length - 1;

		$slider.stop().animate({"bottom" : "-" + $pageList.closest("div").outerHeight() + "px"}, 500, function() {
			$active.hide();
			$pageList.children(":eq(" + index + ")").show();
			$slider.css("bottom", "-" + ($pageList.height() - 10) + "px")
			       .animate({"bottom" : "0"}, 500)
			       .removeClass("down");
		}).addClass("down");

		currentProject = index;
		currentBg = 0;
		clearTimeout(portfolioTimeout);
		setPager();
		transition();
		folioTimeout(bgTime);

		return false;
	});
}

function transition() {
	fadeBgTo(getBgSet(currentProject)[currentBg]);
	$("span.pager a:eq(" + currentBg + ")").addClass("current").siblings().removeClass("current");
	currentBg++;

	if (currentBg == getBgSet(currentProject).length)
		currentBg = 0;
}

$(function() {
	$pageList = $("ol.pages");
	$slider = $pageList.offsetParent("div");
	handleBgs();
	handlePages();
	folioTimeout(bgTime);

	$("div.module").mouseenter(function() {
		if (!$slider.hasClass("down"))
			clearTimeout(portfolioTimeout); 
		else
			folioTimeout(10);
	});

	$(".pager").mouseenter(function() {
		if (!$slider.hasClass("down"))
			clearTimeout(portfolioTimeout);
	});

	$("div.module, .pager").mouseleave(function() {
		folioTimeout(1000);
	});
});


