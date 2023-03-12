document.addEventListener("DOMContentLoaded", function() {
	renderNavBar();
	renderBackground();
});

var renderNavBar = function() {
	var nav = document.createElement("nav");
	nav.classList.add("navbar", "navbar-expand-md", "navbar-dark", "bg-dark");
	
	var div = document.createElement("div");
	div.classList.add("navbar-collapse");
	nav.appendChild(div);
	
	var ul = document.createElement("ul");
	ul.classList.add("navbar-nav", "nav-fill", "w-100", "mr-auto", "mt-2", "mt-lg-0");
	div.appendChild(ul);
	
	//home nav button
	var liHome = document.createElement("li");
	liHome.classList.add("nav-item");
	
	var aHome = document.createElement("a");
	aHome.classList.add("nav-link");
	aHome.innerHTML = "Home";
	aHome.href = "#";
	
	//interactive timeline nav button
	var liTimeline = document.createElement("li");
	liTimeline.classList.add("nav-item");
	
	var aTimeline = document.createElement("a");
	aTimeline.classList.add("nav-link");
	aTimeline.innerHTML = "Interactive Timeline";
	aTimeline.href = "#";
	
	//interactive timeline nav button
	var liTimeline = document.createElement("li");
	liTimeline.classList.add("nav-item");
	
	var aTimeline = document.createElement("a");
	aTimeline.classList.add("nav-link");
	aTimeline.innerHTML = "Interactive Timeline";
	aTimeline.href = "#";
	
	//events timeline nav button
	var liEvents = document.createElement("li");
	liEvents.classList.add("nav-item");
	
	var aEvents = document.createElement("a");
	aEvents.classList.add("nav-link");
	aEvents.innerHTML = "Events";
	aEvents.href = "#";
	
	//questionnaire timeline nav button
	var liQuestion = document.createElement("li");
	liQuestion.classList.add("nav-item");
	
	var aQuestion = document.createElement("a");
	aQuestion.classList.add("nav-link");
	aQuestion.innerHTML = "Questionnaire";
	aQuestion.href = "#";
	
	//quiz timeline nav button
	var liQuiz = document.createElement("li");
	liQuiz.classList.add("nav-item");
	
	var aQuiz = document.createElement("a");
	aQuiz.classList.add("nav-link");
	aQuiz.innerHTML = "Quiz";
	aQuiz.href = "#";
	
	//assign the correct active list item in the navbar
	var pageName = getPageName();
	switch(pageName) {
		case "home":
			aHome.classList.add("active");
			aHome.setAttribute("style", "border-bottom: 2px solid #4287f5");
			break;
		case "timeline":
			aTimeline.classList.add("active");
			aTimeline.setAttribute("style", "border-bottom: 2px solid #4287f5");
			break;
		case "events":
			aEvents.classList.add("active");
			aEvents.setAttribute("style", "border-bottom: 2px solid #4287f5");
			break;
		case "questionnaire":
			aQuestion.classList.add("active");
			aQuestion.setAttribute("style", "border-bottom: 2px solid #4287f5");
			break;
		case "quiz":
			aQuiz.classList.add("active");
			aQuiz.setAttribute("style", "border-bottom: 2px solid #4287f5");
			break;
	}
	
	//add the created elements to the navbar element
	ul.appendChild(liHome);
	liHome.appendChild(aHome);
	ul.appendChild(liTimeline);
	liTimeline.appendChild(aTimeline);
	ul.appendChild(liEvents);
	liEvents.appendChild(aEvents);	
	ul.appendChild(liQuestion);
	liQuestion.appendChild(aQuestion);
	ul.appendChild(liQuiz);
	liQuiz.appendChild(aQuiz);
	
	document.body.insertBefore(nav, document.body.firstChild);
	
	//must do this after adding elements to the DOM so we can modify them through fetching them from DOM
	var liItems = document.getElementsByTagName("li");
	for(var i = 0; i < liItems.length; i++) {	
		liItems[i].setAttribute("style", "box-shadow: inset 0 0 10px #6b7482; border-radius: 4px; margin-right: 1px; margin-left: 1px; padding-right: 1px; padding-left: 1px");
		liItems[i].classList.add("col-12");
	}
};

var renderBackground = function() {
	document.body.setAttribute("style", "overflow-x: hidden");
	document.body.style.backgroundImage = "url('images/museum.png')";
	document.body.style.backgroundSize = "100vw 100vh";
};

function getPageName() {
	url = window.location.href;
	if(!url || (url && url.length === 0)) {
		return "";
	}
	
	var index = url.lastIndexOf("/") + 1;
	var filenameWithExtension = url.substr(index);
	var basename = filenameWithExtension.split(/[.?&#]+/)[0];

	if(basename.length === 0) {
		url = url.substr(0,index-1);
		basename = getBaseName(url);
	}
	
	return basename ? basename : ""; 
}