// this function will update the total price according the quantity selected
// single and total price are converted in decimals
function UpdateTotal(){
	let l_TotalElement = document.getElementById("show_total");
	let l_P = l_TotalElement.attributes["price"].value;
	let l_Q = Validator.CheckInteger(document.getElementById("quantity_selector").value);
	
	l_TotalElement.innerHTML = `${Validator.ComputePrice( l_P * l_Q)}€`;
	
	document.getElementById("modal_quantity").innerHTML = `Quantité : ${l_Q}`;
	document.getElementById("modal_price").innerHTML = `Prix : ${Validator.ComputePrice(l_P)}€`;
	document.getElementById("modal_total").innerHTML = `Total : ${Validator.ComputePrice(l_Q*l_P)}€`;
}


function run(){
	
	// add header and footer contents
	document.getHeader().innerHTML = CompileHeader();
	document.getFooter().innerHTML = CompileFooter();
	
	// get url parameters
	const l_URLParams		=	new URLSearchParams(window.location.search);
	// retreives the product "id" from parameters
	const l_Id				=	l_URLParams.get('id');
	
	if (Product.FromID(l_Id, (pObj) => {

		// creates the container for the product (see product.template.js)
		document.getMain().innerHTML = CompileViewProduct(pObj);
		
		// add event listener for the submit button -> on click, adds the current product in the local storage
		// (the user marked it to purchase and will find it in the basket)
		document.getElementById("button-submit").addEventListener('click', (event) => {
			
			event.preventDefault();
			
			// asserts the quantity is valid
			const l_Q = Validator.CheckInteger(document.getElementById("quantity_selector").value);
			
			if (l_Q<=0) return 0;
			
			// create a product entry to store in local storage
			const l_Product = {
				id		: pObj.id,
				name	: pObj.name,
				price	: pObj.price,
				option	: document.getElementById("option_selector").value,
				quantity: l_Q
			};
			
			// find the products list in local storage
			let l_Item = JSON.parse(localStorage.getItem('product'));
			
			// creates a new list if there was no one set
			if (!l_Item) l_Item = [];
			
			// add the product to the list
			l_Item.push(l_Product);

			// finally updates the local storage
			localStorage.setItem('product', JSON.stringify(l_Item));
			
			// and enables the basket navigation link
			Basket.EnableLink();

			return 0;
			
		});
		
		// add event listener for the "continue" button
		// (this one is in the "modal" window that confirms the user add the product to the basket)
		document.getElementById("button-continue").addEventListener('click', (event) => {
			
			event.preventDefault();
			
			// returns to index
			// [TO DO]
			//		keep track of the position on the index of the selected product
			//		such as the redirection can update the position on the page to the selected product
			//		this might help the user on large scale of products so he doesn't need to scroll
			//		the previously skept products
			window.location.href = 'index.html';
			
			return 0;
			
		});

		// add event listener for the "basket" button
		// user validated the product and want to purchase now
		document.getElementById("button-basket").addEventListener('click', (event) => {
			
			event.preventDefault();
			
			// redirects to the basket.
			window.location.href = 'basket.html';
			
			return 0;
			
		});

		// set the callback function for "quantity_selector" when value change (track the "+" / "-" button events)
		document.getElementById("quantity_selector").onchange = UpdateTotal;

		UpdateTotal();
	}))
	{
		// Enables basket link (the function will automatically disable the navigation link if the basket is empty)
		Basket.EnableLink();
	}
}


window.addEventListener('load', run);