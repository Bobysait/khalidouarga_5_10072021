function CompileListCard(pObj){
	if (!Product.ValidateProduct(pObj)){
		throw ("Invalid Object on CompileListCard",pObj);
	};
	
	return `<div class="d-flex flex-column col-sm-5 col-lg-5 mt-5 mb-5 mx-auto card">
				<div class="thumbnail mx-auto">
					<h3 class="text-center">${pObj.name}</h3>
					<a href="${pObj.getHref()}">
						<span class="blur"><img src="${pObj.imageUrl}" class="img-fluid" width="300" height="300" alt="${pObj.productType} ${pObj.name}" ></span>
					</a>
					<div class="card-footer">
						<p>${Validator.ComputePrice(pObj.price)} €</p>
						<a href="${pObj.getHref()}">Voir le produit</a>
					</div>
				</div>
			</div>`;
}