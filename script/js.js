var bgInterval;
var $bg;
var $bg2;
var images = { 
	sunrise: {
		defaultBg: "bgSunrise.jpg",
		projectBgs: 	[["project1-1.jpg", "project1-2.jpg", "project1-3.jpg", "project1-4.jpg", "project1-5.jpg"],
				["project2-1.jpg", "project2-2.jpg", "project2-3.jpg", "project2-4.jpg", "project2-5.jpg"],
				["project3-1.jpg", "project3-2.jpg", "project3-3.jpg", "project3-4.jpg", "project3-5.jpg"],
				["project4-1.jpg", "project4-2.jpg", "project4-3.jpg", "project4-4.jpg", "project4-5.jpg"],
				["project5-1.jpg", "project5-2.jpg", "project5-3.jpg", "project5-4.jpg"]]
	},
	day: {
		defaultBg: "bgDay.jpg",
		projectBgs: 	[["project1-1.jpg", "project1-2.jpg", "project1-3.jpg", "project1-4.jpg", "project1-5.jpg"],
				["project2-1.jpg", "project2-2.jpg", "project2-3.jpg", "project2-4.jpg", "project2-5.jpg"],
				["project3-1.jpg", "project3-2.jpg", "project3-3.jpg", "project3-4.jpg", "project3-5.jpg"],
				["project4-1.jpg", "project4-2.jpg", "project4-3.jpg", "project4-4.jpg", "project4-5.jpg"],
				["project5-1.jpg", "project5-2.jpg", "project5-3.jpg", "project5-4.jpg"]]
	},
	sunset: {
		defaultBg: "bgSunset.jpg",
		projectBgs: 	[["project1-1.jpg", "project1-2.jpg", "project1-3.jpg", "project1-4.jpg", "project1-5.jpg"],
				["project2-1.jpg", "project2-2.jpg", "project2-3.jpg", "project2-4.jpg", "project2-5.jpg"],
				["project3-1.jpg", "project3-2.jpg", "project3-3.jpg", "project3-4.jpg", "project3-5.jpg"],
				["project4-1.jpg", "project4-2.jpg", "project4-3.jpg", "project4-4.jpg", "project4-5.jpg"],
				["project5-1.jpg", "project5-2.jpg", "project5-3.jpg", "project5-4.jpg"]]
	},
	night: {
		defaultBg: "bgNight.jpg",
		projectBgs: 	[["project1-1.jpg", "project1-2.jpg", "project1-3.jpg", "project1-4.jpg", "project1-5.jpg"],
				["project2-1.jpg", "project2-2.jpg", "project2-3.jpg", "project2-4.jpg", "project2-5.jpg"],
				["project3-1.jpg", "project3-2.jpg", "project3-3.jpg", "project3-4.jpg", "project3-5.jpg"],
				["project4-1.jpg", "project4-2.jpg", "project4-3.jpg", "project4-4.jpg", "project4-5.jpg"],
				["project5-1.jpg", "project5-2.jpg", "project5-3.jpg", "project5-4.jpg"]]
	}
};
var bgState = getBgState();

function getBgSet(projectIndex) {
	return bgState.projectBgs[projectIndex];	
}

function getBgState() {
	var hour = new Date().getHours();

	if (hour >= 4 && hour < 10)
		return images.sunrise;
	if (hour >= 10 && hour < 16)
		return images.day;
	if (hour >= 16 && hour < 22)
		return images.sunset;
	
	return images.night;
}

function fadeBgTo(image, delay) {
	$bg2.show();
	$bg[0].src = "/images/" + image;
	$bg2.fadeOut(2000, function() { $bg2[0].src = $bg[0].src; });
}

$(function() {
	$bg = $("#bg");
	$bg2 = $("#bg2");
	$bg[0].src = $bg2[0].src = "/images/" + bgState.defaultBg;

	$bg.load(function() {
		$bg.fadeIn(2000);

		$.each(bgState.projectBgs, function() {
			$.each(this, function() {
				(new Image()).src = "/images/" + this;
			});
		});
	});
	
	
	$("#loading").ajaxStart(function() {
		$(this).stop().fadeIn();
	}).ajaxStop(function() {
		$(this).stop().fadeOut();
	});

	$("#nav a").each(function() {
		if (this.href)
			this.href = this.href.replace(/^http:\/\/(.+?)\/(.+)$/, 'http://$1/#/$2');
	});

	$("ul.sf-menu").superfish({
		autoArrows: false,
		dropShadows: false
        });

	$(window).hashchange(hashChange);

	if (location.hash)
		hashChange(true);

	Cufon.replace('h1, h2', { fontFamily: "HelveticaCondensed" });
});

function hashChange(skipFade) {
	var page = "/index.html";
	var $content = $("#content");
	var transitionTime = 300;
	clearInterval(bgInterval);

	if (skipFade !== true)
		fadeBgTo(bgState.defaultBg);

	if (location.hash)
		page = location.hash.substring(1);

	$content.fadeOut(transitionTime, function() {
		$content.load(page + " #content > div", function() {
			$content.fadeIn(transitionTime)
				.attr("class", page.substring(1, page.lastIndexOf('.')));

			$.getScript("/script" + page.replace("html", "js"));
			Cufon.replace('h1, h2', { fontFamily: "HelveticaCondensed" });
		});
	});
}
