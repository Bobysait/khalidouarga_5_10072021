const C_Products = JSON.parse(localStorage.getItem('product'));

class Basket {
	
	constructor (){
		this.firstName			=	document.getElementById("firstName"),
		this.lastName			=	document.getElementById("lastName"),
		this.email				=	document.getElementById("email"),
		this.address			=	document.getElementById("address"),
		this.cp					=	document.getElementById("code"),
		this.city				=	document.getElementById("city");
	}
	
	// check if basket/cart is empty (find anything in local storage)
	static IsEmpty(){
		let l_Products = JSON.parse(localStorage.getItem('product'));
		return (l_Products==null) || (l_Products.length==0);
	}

	// clear the local storage
	static Clear(){
		localStorage.clear();
	}

	// if the basket/cart is empty : disables the navigation button to the basket
	static EnableLink(pForceEnable=false){
		if (!Basket.IsEmpty() || pForceEnable==true) {
			document.getElementById("navlink-basket").classList.remove("disabled");
		}
	}

	static Send(pContact, pProductIDs, pTotal){
		// Post request
		fetch(Product.GetServerURL()+"/order", {
			method	: "POST",
			headers	: { "Content-Type": "application/json",},
			body	: JSON.stringify({ "contact" : pContact, "products" : pProductIDs }),
		})
		// parse result to json
		.then((r) => r.json())
		.then((d) => {
			localStorage.setItem("order", JSON.stringify(d));
			// show information on the confirmation command popup
			document.getElementById("order-id").innerHTML = d.orderId;
			document.getElementById("order-price").innerHTML = Validator.ComputePrice(pTotal)+"€";

			// on modal dismiss -> clear basket and return to index
			document.getElementById("showRegisteredCommand").addEventListener("hidden.bs.modal", (event) => {
				event.preventDefault();
				// clear basket
				localStorage.clear();
				window.location.href = 'index.html';
				return 0;
			});
			document.getElementById("button-index").addEventListener('click', (event) => {
				event.preventDefault();
				// clear basket
				localStorage.clear();
				window.location.href = 'index.html';
				return 0;
			});
		})
		.catch((e) => console.log("post fail with error", e));
	}

	// function that only verify all fields are ok to enable the validation button
	// -> does not show errors !
	static ValidateFields(){
		Basket.DisableConfirmBasketBtn();
		let l_FirstName					=	document.getElementById("firstName"),
			l_LastName					=	document.getElementById("lastName"),
			l_Email						=	document.getElementById("email"),
			l_Address					=	document.getElementById("address"),
			l_CP						=	document.getElementById("code"),
			l_City						=	document.getElementById("city");
		if (l_FirstName.validity.valid && Validator.TestName(l_FirstName.value)){
		if (l_LastName.validity.valid && Validator.TestName(l_LastName.value)) {
		if (l_Email.validity.valid && Validator.TestEmail(l_Email.value)) {
		if (l_Address.validity.valid && Validator.TestAddress(l_Address.value)) {
		if (l_CP.validity.valid && Validator.TestCodePostal(l_CP.value)) {
		if (l_City.validity.valid && Validator.TestName(l_City.value)) {
			Basket.EnableConfirmBasketBtn();
			return true;
		}}}}}}
		return false;
	}

	// enable validation button
	static EnableConfirmBasketBtn(){
		document.getElementById("btn_validateBasket").classList.remove("disabled");
	}
	// disable validation button
	static DisableConfirmBasketBtn(){
		document.getElementById("btn_validateBasket").classList.add("disabled");
	}

	static ValidateFirstName(){
		// check firstname
		let l_FirstName					=	document.getElementById("firstName"),
			l_Err_FirstName				=	document.getElementById('err_firstName');	
		if (l_FirstName.validity.valid && Validator.TestName(l_FirstName.value)) {
			l_Err_FirstName.innerHTML	=	"";
			l_Err_FirstName.className	=	"error";
		}else{
			// name not validated : show the error
			l_Err_FirstName.innerHTML	=	"Prénom invalide";
			l_Err_FirstName.className	=	"error active";
			Basket.DisableConfirmBasketBtn();
			return false;
		};
		return Basket.ValidateFields();
	}

	static ValidateLastName = () => {
		// check last name
		let l_LastName					=	document.getElementById("lastName"),
			l_Err_LastName				=	document.getElementById('err_lastName');
		if (l_LastName.validity.valid && Validator.TestName(l_LastName.value)) {
			l_Err_LastName.innerHTML	=	"";
			l_Err_LastName.className	=	"error";
		}else{
			l_Err_LastName.innerHTML	=	"Nom invalide";
			l_Err_LastName.className	=	"error active";
			Basket.DisableConfirmBasketBtn();
			return false;
		};
		return Basket.ValidateFields();
	}
	
	static ValidateEmail = () => {
		// check email
		let l_Email						=	document.getElementById("email"),
			l_Err_Email					=	document.getElementById('err_email');
		if (l_Email.validity.valid && Validator.TestEmail(l_Email.value)) {
			l_Err_Email.innerHTML		=	"";
			l_Err_Email.className		=	"error";
		}else{
			l_Err_Email.innerHTML		=	"Email invalide";
			l_Err_Email.className		=	"error active";
			Basket.DisableConfirmBasketBtn();
			return false;
		};
		return Basket.ValidateFields();
	}
	
	static ValidateAddress = () => {
		// check adress
		let l_Address					=	document.getElementById("address"),
			l_Err_Address				=	document.getElementById('err_address');
		if (l_Address.validity.valid && Validator.TestAddress(l_Address.value)) {
			l_Err_Address.innerHTML		=	"";
			l_Err_Address.className		=	"error";
		}else{
			l_Err_Address.innerHTML		=	"Adresse invalide";
			l_Err_Address.className		=	"error active";
			Basket.DisableConfirmBasketBtn();
			return false;
		};
		return Basket.ValidateFields();
	}
	
	static ValidateCP = () => {
		// check postal code
		let l_CP						=	document.getElementById("code"),
			l_Err_Code					=	document.getElementById('err_code');
		if (l_CP.validity.valid && Validator.TestCodePostal(l_CP.value)) {
			l_Err_Code.innerHTML		=	"";
			l_Err_Code.className		=	"error";
		}else{
			l_Err_Code.innerHTML		=	"Code postal invalide";
			l_Err_Code.className		=	"error active";
			Basket.DisableConfirmBasketBtn();
			return false;
		};
		return Basket.ValidateFields();
	}
	
	static ValidateCity = () => {
		// check city
		let l_City						=	document.getElementById("city"),
			l_Err_City					=	document.getElementById('err_city');
		if (l_City.validity.valid && Validator.TestName(l_City.value)) {
			l_Err_City.innerHTML		=	"";
			l_Err_City.className		=	"error";
		}else{
			l_Err_City.innerHTML		=	"Ville invalide";
			l_Err_City.className		=	"error active";
			Basket.DisableConfirmBasketBtn();
			return false;
		};
		return Basket.ValidateFields();
	}
	
	// validate each entries ( or not )
	static ValidateForm(){
		// if something went wrong : disable the validation button and return false
		Basket.DisableConfirmBasketBtn();

		if (!Basket.ValidateFirstName())	return false;
		if (!Basket.ValidateLastName())		return false;
		if (!Basket.ValidateEmail())		return false;
		if (!Basket.ValidateAddress())		return false;
		if (!Basket.ValidateCP())			return false;
		if (!Basket.ValidateCity())			return false;

		// all fields are correct ? -> enable validation
		Basket.EnableConfirmBasketBtn();
		return true;
	}

	static EnableForm(){
		
		// Get form element
		let l_Form						=	document.getElementsByClassName("no_validation")[0];

		// form not found ?
		if (!l_Form) {
			console.error("Form not found ...");
			return;
		}

		// add an event to prevent form to validate on "enter"
		// (if any field of the form is not valid)
		l_Form.addEventListener("keydown",(e) => {
			if (e.key =='Enter'){
				if (!Basket.ValidateForm()){
					e.preventDefault();
				}
			}
			return true;
		});

		// check first name
			let l_FirstName				=	document.getElementById("firstName");
			l_FirstName.addEventListener	("input", (event) => { event.preventDefault(); Basket.ValidateFirstName(); });
		// check last name
			let l_LastName				=	document.getElementById("lastName");
			l_LastName.addEventListener		("input", (event) => { event.preventDefault(); Basket.ValidateLastName(); });

		// check email
			let l_Email					=	document.getElementById("email");
			l_Email.addEventListener		("input", (event) => { event.preventDefault(); Basket.ValidateEmail(); });
		// check adress
			let l_Address				=	document.getElementById("address");
			l_Address.addEventListener		("input", (event) => { event.preventDefault(); Basket.ValidateAddress(); });

		// check postal code
			let l_CP					=	document.getElementById("code");
			l_CP.addEventListener			("input", (event) => { event.preventDefault(); Basket.ValidateCP(); });

		// check city
			let l_City					=	document.getElementById("city");
			l_City.addEventListener			("input", (event) => { event.preventDefault(); Basket.ValidateCity(); });

		// add the validation button event
		document.getElementById("btn_validateBasket").addEventListener("click" , function (event){
			event.preventDefault();
			
			// enable css validation style
		//	l_Form.classList.remove("no_validation");
		//	l_Form.classList.add("validation");
			
			let l_ProductIds	=	[],
				l_Total			=	0;
			for (let l_Product of C_Products) {
				l_ProductIds.push(l_Product.id);
				l_Total += l_Product.price * l_Product.quantity;
			}

			let l_Contact = {"firstName": l_FirstName.value,
							"lastName"	: l_LastName.value,
							"address"	: l_Address.value+" "+l_CP.value,
							"city"		: l_City.value,
							"email"		: l_Email.value};
							
			Basket.Send(l_Contact, l_ProductIds, l_Total);
			
		})
	}

}