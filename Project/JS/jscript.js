
document.addEventListener("DOMContentLoaded", function () {
	renderNavBar();
	renderBackground();
});

var renderNavBar = function () {
	var nav = document.createElement("nav");
	nav.classList.add("navbar", "navbar-expand-md", "navbar-dark", "bg-dark");

	var div = document.createElement("div");
	div.classList.add("navbar-collapse");
	nav.appendChild(div);

	var ul = document.createElement("ul");
	ul.classList.add(
		"navbar-nav",
		"nav-fill",
		"w-100",
		"mr-auto",
		"mt-2",
		"mt-lg-0"
	);
	div.appendChild(ul);

	makeNavChild("Home", "index.html", ul);
	makeNavChild("Interactive Timeline", "timeline.html", ul);
	makeNavChild("Events", "events.html", ul);
	makeNavChild("Questionnaire", "questionnaire.html", ul);
	makeNavChild("Quiz", "quiz.html", ul);

	document.body.insertBefore(nav, document.body.firstChild);

	//must do this after adding elements to the DOM so we can modify them through fetching them from DOM
	var liItems = document.getElementsByTagName("li");
	for (var i = 0; i < liItems.length; i++) {
		liItems[i].setAttribute(
			"style",
			"box-shadow: inset 0 0 10px #6b7482; border-radius: 4px; margin-right: 1px; margin-left: 1px; padding-right: 1px; padding-left: 1px"
		);
		liItems[i].classList.add("col-12");
	}
};

function makeNavChild(label, linksTo, ulElement) {
	//home nav button
	var li = document.createElement("li");
	li.classList.add("nav-item");

	var a = document.createElement("a");
	a.classList.add("nav-link", "text-white");
	a.innerHTML = label;
	a.href = linksTo;

	ulElement.appendChild(li);
	li.appendChild(a);

	if(getPageName().toLowerCase() == label.toLowerCase()) {
		a.classList.add("active");
		a.setAttribute("style", "border-bottom: 2px solid #4287f5");
	} else if(getPageName().toLowerCase() == "index" && label.toLowerCase() == "home") {
		a.classList.add("active");
		a.setAttribute("style", "border-bottom: 2px solid #4287f5");
	} else if(getPageName().toLowerCase() == "timeline" && label.toLowerCase() == "interactive timeline") {
		a.classList.add("active");
		a.setAttribute("style", "border-bottom: 2px solid #4287f5");
	}
}

var renderBackground = function () {
	document.body.setAttribute("style", "overflow-x: hidden");
	document.body.style.backgroundImage = "url('images/museum.png')";
	document.body.style.backgroundSize = "100vw 100vh";
};

function getPageName() {
	url = window.location.href;
	if (!url || (url && url.length === 0)) {
		return "";
	}

	var index = url.lastIndexOf("/") + 1;
	var filenameWithExtension = url.substr(index);
	var basename = filenameWithExtension.split(/[.?&#]+/)[0];

	if (basename.length === 0) {
		url = url.substr(0, index - 1);
		basename = getBaseName(url);
	}

	return basename ? basename : "";
}