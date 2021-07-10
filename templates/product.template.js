function CompilePopupGotoBasket(pObj){
	if (!Product.ValidateProduct(pObj)){
		console.error("Invalid Object on CompilePopupGotoBasket",pObj);
	};
	return `<div class="modal fade" id="popupGotoBasket" tabindex="-1" aria-labelledby="showBasketLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="showBasketLabel">PRODUIT AJOUTÉ AU PANIER</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<h5>${pObj.name}</h5>
							<p id="modal_quantity">Quantité : 1</p>
							<p id="modal_price">Prix : ${Validator.ComputePrice(pObj.price)}€</p>
							<p id="modal_total">Total : ${Validator.ComputePrice(pObj.price)}€</p>
							Vous pouvez consulter le panier ou continuer vos achats</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="button-continue">Continuer mes achats</button>
							<button type="button" class="btn btn-primary" id="button-basket">Afficher le panier</button>
						</div>
					</div>
				</div>
			</div>`;
}

function CompileThumbnail(pObj){
	if (!Product.ValidateProduct(pObj)){
		console.error("Invalid Object on CompileThumbnail",pObj);
	};
	return `<img src="${pObj.imageUrl}" class="rounded img-fluid mx-auto" width="auto" height="auto" alt="image ${Product.GetProductAttrib('category')} ${pObj.name}">`;
}


function CompileOptions(pObj){
	if (!Product.ValidateProduct(pObj)){
		console.error("Invalid Object on CompileOptions",pObj);
	};
	let l_Str = [`<label for="option_selector">${Product.GetProductAttrib("option-display")}</label>`,
				`<select id="option_selector">`].join('\n');
					
	for (let l_Opt of pObj.options){
		l_Str += `<option value="${l_Opt}">${l_Opt}</option>`;
	}
	return l_Str+["</select>"].join('\n');
}

function CompileQuantity(pMin=1, pMax=10){
	return [`<label for="quantity_selector">x</label>`,
			`<input type="number" id="quantity_selector" min="${pMin}" max="${pMax}" value="1">`].join("\n");
}

function CompileDescription(pObj){
	return `<div class="product_desc">
				<h3 class="mx-3 mt-3">- Description -</h3>
				<div class="row mx-5 my-4 justify-content-center align-items-center align-items-sm-end">
					<div class="col-8 col-md-9 mt-2">${pObj.description}</div>
					<div class="col-3 col-md-2 mt-2 text-center center-block show_price">${Validator.ComputePrice(pObj.price)}€</div>
				</div>
			</div>`;
}

function CompileButton(){
	return `<button id="button-submit" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#popupGotoBasket">
				<i class="fas fa-shopping-cart"></i> Ajouter au panier !
			</button>`;
}

function CompileViewProduct(pObj){
	return `<div class="col-md-8 col-sm-12 mx-auto">
				<figure class="d-flex flex-column img-fluid mt-5" id="view-product">
					${CompileThumbnail(pObj)}
					<figcaption>${pObj.name}</figcaption>
					${CompileDescription(pObj)}

					<form class="mt-3">
						<div class="row">
							<div class="col-6">
							${CompileOptions(pObj)}
							</div>
						</div>
					</form>
					
					<div class="row align-items-center my-5">
						<div class="col-3 text-end">
							${CompileQuantity(1,10)}
						</div>
						<div class="col-3 text-start">
							<span id="show_total" price="`+pObj.price+`"></span>
						</div>
						<div class="col-5">
							${CompileButton(pObj)}
						</div>
				</figure>
			</div>
			${CompilePopupGotoBasket(pObj)}`;
}

