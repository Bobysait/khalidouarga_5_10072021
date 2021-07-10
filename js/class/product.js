// Product Configuration
	// array of attributes to map generic naming to this product specific naming
	// this can be used for another site/page where the product would be different
	// just replacing the category/option names/etc would allow to sell totally different product.
	const __C_PRODUCT_CONFIG__		=	{
		"category"		: "teddy",
		"option-name"	: "colors",
		"option-display": "Couleurs",
		"server_url"	: Server.GetURL()+"/api/teddies"
	}
	
	// structur of the front objects (ie : the required fields)
	const __C_LEGAL_PRODUCT__		=	{
										"id"			:	"string",
										"name"			:	"string",
										"price"			:	"number",
										"description"	:	"string",
										"imageUrl"		:	"string",
										"options"		:	"array"
									};

class Product {
	
	// the constructor initializes all fields of the specified object
	// -> transform a request object from "back" to an internal "front" object 
	constructor(pObject) {
		this.productType				=	Product.GetProductAttrib('category');
		this.id							=	pObject._id;
		this.name						=	pObject.name;
		this.price						=	pObject.price;
		this.description				=	pObject.description;
		this.imageUrl					=	pObject.imageUrl;
		this.optionName					=	Product.GetProductAttrib('option-display');
		this.options					=	pObject.colors;
	}
	
	// product route -> api/product/:id
	getHref(){
		return "product.html?id="+this.id;
	}

	// validate internal product objects
	static ValidateProduct(pObj) {
		return Validator.ValidateObject(__C_LEGAL_PRODUCT__, pObj);
	}

	static GetProductAttrib (pAttrib) {
		return __C_PRODUCT_CONFIG__.hasOwnProperty(pAttrib) ? __C_PRODUCT_CONFIG__[pAttrib] : (function (){
			console.error ("config error : unable to find config attribute '"+pAttrib+"'"); return "";
		});
	}
	
	static CategoryFromType () {
		return Product.GetProductAttrib("category");
	}
	
	static GetServerURL () {
		return Product.GetProductAttrib("server_url");
	}
	
	static FromID(pId, pCallBack) {
		// get items from server
		fetch(Product.GetProductAttrib("server_url")+'/'+pId).then((response) => {
			return response.json()
		}).then((data) => {
			// validate object by checking all attributes
			if (!ServerObject.ValidateObject(data)) throw new Error(`trying to parse an illegal object from server`);
			pCallBack(new Product(data));
		}).catch((err) => {
			console.error(err);
			return 0;
		});
		return 1;
	}
	
	static GetCards () {
		document.getMain();
		
		fetch(Product.GetServerURL()).then((response) => {
		    return response.json()
		})
		.then((data) => {
			data.forEach(product => {
				(new Product(product)).buildCard();
			});
			Basket.EnableLink();
		})
		.catch((err) => {
		    console.log(err)
		});
	}

	buildCard () {
		document.getMain().innerHTML += CompileListCard(this);
	}
	
}
