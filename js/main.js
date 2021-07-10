/* defines new methods for document
 - retreives body/header/main/footer
 - creates an empty element if the element does not exist
*/
	(function (){
		document.getBody = function(){
			let l = this.getElementsByTagName("body")[0];
			if (l==null){ this.appendChild(this.createElement("body")); return this.getBody(); }
			return l;
		}

		document.getHeader = function(){
			let l = this.getBody().getElementsByTagName("header")[0];
			if (l==null){ this.getBody().appendChild(this.createElement("header")); return this.getHeader(); }
			return l;
		}

		document.getMain = function(){
			let l = this.getBody().getElementsByTagName("main")[0];
			if (l==null){ this.getBody().appendChild(this.createElement("main")); return this.getMain(); }
			return l;
		}
		
		document.getFooter = function(){
			let l = this.getBody().getElementsByTagName("footer")[0];
			if (l==null){ this.getBody().appendChild(this.createElement("footer")); return this.getFooter(); }
			return l;
		}
	})();



// removes a product from a list
function removeObj(pList,pProduct){
	let l_Pos = pList.indexOf(pProduct);
	// if the list contains the product, then we can remove it
	if (l_Pos>=0){
		pList.splice(l_Pos,1);
		// also removes the product from local storage
		localStorage.setItem('product', JSON.stringify(pList));
	}
}
