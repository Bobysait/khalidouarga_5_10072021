function run(){
	
	// no products (empty basket) -> return to index
	if (!C_Products || C_Products.length<1){
		window.location.href = 'index.html';
		return;
	}
	
	// add header and footer
	document.getHeader().innerHTML = CompileHeader();
	document.getFooter().innerHTML = CompileFooter();
	
	// compile html for product list
	let l_HTML = `<div class="basketList">`;
	l_HTML	+=	CompileBasketItemRow();

	// Initialises quantity ant total
	let l_Quantity = 0;
	let l_Total = 0;
	
	// for each product in the basket : add a row
	for (let l_Product of C_Products) {
		l_HTML	+=	CompileBasketItem(	l_Product.id,
										l_Product.name,
										l_Product.option,
										l_Product.quantity,
										l_Product.price);
		// sum up all products prices
		l_Quantity += l_Product.quantity;
		l_Total += l_Product.price * l_Product.quantity;
	}
	
	// add a row to show total products and price
	l_HTML += CompileBasketTotal(l_Quantity, l_Total);
	
	// close basket list container
	l_HTML += "</div>";

	// add form to fill user informations
	l_HTML += CompileBasketForm();

	// finally adds the confirmation popup
	l_HTML += CompilePopupCommand();

	// set the html for "<main>"
	document.getMain().innerHTML = l_HTML;
	

	// enable "remove" buttons for each product
	for (let l_Product of C_Products) {
		document.getElementById("remove_"+l_Product.id).addEventListener("click",
		(event) => {
			event.preventDefault();
			// on click, remove the product from the basket
			removeObj(C_Products,l_Product);
			// and reload to update the page with the product removed
			document.location.reload();
		});
	};

	// enable validation form
	document.getElementById("user_informations").style.display = "block";

	Basket.EnableForm();
}

window.addEventListener('load', run);