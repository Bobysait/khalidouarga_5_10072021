function run(){
	
	// add header and footer contents
	document.getHeader().innerHTML = CompileHeader();
	document.getFooter().innerHTML = CompileFooter();

	// build products cards
	Product.GetCards();
	
}

// add an event to launch "run" function when page is ready
window.addEventListener('load', run);