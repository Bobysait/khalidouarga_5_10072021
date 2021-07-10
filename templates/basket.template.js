// Quantity and Total row
function CompileBasketTotal(pQuantity, pTotal){
	return `<div class="row border my-1 mx-auto">
					<div class="col-7 text-end">${pQuantity}</div>
					<div class="col-2"></div>
					<div class="col-2 text-end">${Validator.ComputePrice(pTotal)}€</div>
				</div>`;
}

// products table "header"
function CompileBasketItemRow(){
	return `<div class="row border my-2 mx-auto">
				<div class="col-3 text-left">Nom</div>
				<div class="col-2 text-left">Couleur</div>
				<div class="col-2 text-end">Quantité</div>
				<div class="col-2 text-end">Prix</div>
				<div class="col-2 text-end">Total</div>
			</div>`;
}

// product row
function CompileBasketItem(pId, pName, pOption, pQuantity, pPrice){
	return `<div class="row border-start border-end my-2 mx-auto">
				<div class="col-3 name ">${pName}</div>
				<div class="col-2 text-left option">${pOption}</div>
				<div class="col-2 text-end quantity">${pQuantity}</div>
				<div class="col-2 text-end price">${Validator.ComputePrice(pPrice)}€</div>
				<div class="col-2 text-end total">${Validator.ComputePrice(pQuantity*pPrice)}€</div>
				<div class="col-1 text-end"><i class="fas fa-trash-alt" id="remove_${pId}"></i></div>
			</div>`;
}

// user information form
function CompileBasketForm(){
	return `<div class="my-4" id="user_informations">
				<h2 class="my-5 text-center">Validation de commande</h2>

				<div class="row mx-5 border">
					<div class="col">
						<form class="no_validation" novalidate>
							<div class="form-group">
								<label for="lastName">Nom</label>
								<input type="text" class="form-control" id="lastName" aria-describedby="emailHelp" required>
								<span class="error" id="err_lastName" aria-live="polite"></span>
							</div>
							<div class="form-group">
								<label for="firstName">Prénom</label>
								<input type="text" class="form-control" id="firstName" required>
								<span class="error" id="err_firstName" aria-live="polite"></span>
							</div>
							<div class="form-group">
								<label for="email">Email</label>
								<input type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
								<span class="error" id="err_email" aria-live="polite"></span>
							</div>
							<div class="form-group">
								<label for="address">Numero et rue</label>
								<input type="text" class="form-control" id="address" required>
								<span class="error" id="err_address" aria-live="polite"></span>

								<label for="code">Code postal</label>
								<input type="number" class="form-control" id="code" min="1000" max="99999" required>
								<span class="error" id="err_code" aria-live="polite"></span>

								<label for="city">Ville</label>
								<input type="text" class="form-control" id="city" required>
								<span class="error" id="err_city" aria-live="polite"></span>
							</div>
							<button type="submit" class="my-4 btn btn-primary disabled" id="btn_validateBasket" data-bs-toggle="modal" data-bs-target="#showRegisteredCommand">Passer la commande</button>
						</form>
					</div>
				</div>
			</div>`;
}



function CompilePopupCommand(){
	return `<div class="modal fade" id="showRegisteredCommand" tabindex="-1" aria-labelledby="labelRegisteredCommand" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="labelRegisteredCommand">Commande effectuée</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<h5>Votre commande a été enregistrée</h5>
							<p>Nous vous remercions d'avoir passé commande chez nous,</p>
							<p>votre commande enregistrée sous le numéro <span id="order-id"></span></p>
							<p>vous sera envoyée dans les plus brefs délais.</p>
							<p id="order-price"></p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" id="button-index">Retourner à l'accueil</button>
						</div>
					</div>
				</div>
			</div>`;
}
