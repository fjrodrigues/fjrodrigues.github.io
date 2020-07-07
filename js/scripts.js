const baseImageSource = "images/manual/AnachronicStamp_page-";
const fileExtension = ".jpg";
const maxPageNumber = 63;
var currentPage = 1;

function nextImage() {
	if (this.currentPage < maxPageNumber) {
		this.currentPage++;
		const formatedNumber = formatNumber(this.currentPage);
		setPageNumber(formatedNumber);
	}
}

function previousImage() {
	if (this.currentPage != 1) {
		this.currentPage--;
		const formatedNumber = formatNumber(this.currentPage);
		setPageNumber(formatedNumber);
	}
}

function setPageNumber(pageNumber) {
	const newImageSource = baseImageSource + pageNumber + fileExtension;
	document.getElementById("manual").src = newImageSource;
}

function formatNumber(numberToFormat) {
	if (numberToFormat < 10) {
		return "000" + numberToFormat;
	}
	if (numberToFormat < 100) {
		return "00" + numberToFormat;
	}
	if (numberToFormat < 1000) {
		return "0" + numberToFormat;
	}
	return numberToFormat;
}

function goToPage() {
	this.currentPage = parseInt(event.target.dataset.page);
	const formatedNumber = formatNumber(this.currentPage);
	setPageNumber(formatedNumber);
}

var activeItem;
function toggleActive() {
	const eventSource = event.target.dataset.target;
	let newActiveItem = "phase-" + eventSource;
	if (!this.activeItem || this.activeItem == newActiveItem) {
		var elements = Array.from(
			document.getElementsByClassName(newActiveItem)
		);
		elements.forEach((element) => element.classList.toggle("active-item"));
	} else {
		var elements = Array.from(
			document.getElementsByClassName(this.activeItem)
		);
		elements.forEach((element) => element.classList.remove("active-item"));
		var newElements = Array.from(
			document.getElementsByClassName(newActiveItem)
		);
		newElements.forEach((element) =>
			element.classList.toggle("active-item")
		);
	}
	this.activeItem = newActiveItem;
	toggleFictionBlock(eventSource);
}
function toggleFictionBlock(target) {
	const targetClassIdentifier = target;
	let timelineBlockElements = document.getElementsByClassName(
		"timeline-block"
	);
	for (let j = 0; j < timelineBlockElements.length; j++) {
		if (
			timelineBlockElements[j].classList.contains(targetClassIdentifier)
		) {
			timelineBlockElements[j].classList.toggle("d-none");
			scrollToSection();
			if (timelineBlockElements[j].classList.contains("d-none")) {
				pauseSelfVideo(targetClassIdentifier);
			}
		} else if (!timelineBlockElements[j].classList.contains("d-none")) {
			timelineBlockElements[j].classList.add("d-none");
			pauseOthers(targetClassIdentifier);
		}
	}
}

function scrollToSection() {
	$("html, body")
		.stop(true, false)
		.animate({ scrollTop: $("#video_section").offset().top }, 800);
}

function pauseSelfVideo(target) {
	videoPlayerId = "video_" + target;
	document.getElementById(videoPlayerId).pause();
}

function pauseOthers(excludePlayer) {
	let listOfPlayersIds = [
		"video_pair-1",
		"video_pair-2",
		"video_pair-3",
		"video_pair-4"
	];
	for (element in listOfPlayersIds) {
		if (listOfPlayersIds[element] != excludePlayer) {
			document.getElementById(listOfPlayersIds[element]).pause();
		}
	}
}

var activeItemTimeline;
function toggleVisibility() {
	let target = event.target;
	if (!this.activeItemTimeline || this.activeItemTimeline == target.id) {
		target.classList.toggle("active-timeline");
	} else {
		var element = document.getElementById(this.activeItemTimeline);
		element.classList.remove("active-timeline");
		target.classList.toggle("active-timeline");
	}
	this.activeItemTimeline = target.id;
	toggleTimeBlock(target.dataset.target);
}
function toggleTimeBlock(target) {
	const targetClassIdentifier = target;
	let timelineBlockElements = document.getElementsByClassName(
		"timeline-block"
	);
	for (let j = 0; j < timelineBlockElements.length; j++) {
		if (
			timelineBlockElements[j].classList.contains(targetClassIdentifier)
		) {
			timelineBlockElements[j].classList.toggle("d-none");
			scrollToSection();
			if (timelineBlockElements[j].classList.contains("d-none")) {
				pauseSelfVideo(targetClassIdentifier);
			}
		} else if (!timelineBlockElements[j].classList.contains("d-none")) {
			timelineBlockElements[j].classList.add("d-none");
			pauseOthers(targetClassIdentifier);
		}
	}
}
