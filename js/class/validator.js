/* TOOLS for validation */

class Validator {

	// as an abstract class, we are not supposed to instanciate it.
	// So we only declare the constructor to throw an error when the class is instanciated.
	constructor(){
		throw ("this class is made to be abstract and should never be instanciated !");
	}

	/* Validation */
		// assert value is an integer
		static CheckInteger(pV){
			pV = parseInt(pV,10);
			return isNaN(pV) ? 0 : pV;
		}
		
		// price are given in "cents"
		// -> this function formats the result to a float with 2 digits precision
		static ComputePrice(pPrice){
			return parseFloat(Validator.CheckInteger(pPrice)*0.01).toFixed(2);
		}

		// test if object owns the required attribute and attribute is the good object type
		static ValidateField(pObj, pField, pType){
			return (pObj.hasOwnProperty(pField)) && (pType=="array" ? Array.isArray(pObj[pField]) : typeof(pObj[pField])==pType);
		}

	/* Shortcut functions to validate fields */
		
		// asserts name is a valid name
		static TestName(pName){
			// empty name : invalid
			if (!pName) return false;
			// remove spaces before and after characters
			let l_Name = pName.trim();
			// nothing left for the name ? invalid !
			if (l_Name.length<1) return false;
			// validate the characters using a regex
			return l_Name.match(/^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/);
		}

		// asserts the email is valid
		static TestEmail(pMail) {
			if (!pMail) return false;
			let l_Email = pMail.trim();
			if (l_Email.length<1) return false;
			const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(pMail);
		}
		
		// asserts the adress is valid
		static TestAddress(pAddress){
			if (!pAddress) return false;
			let l_Address = pAddress.trim();
			if (l_Address.length<1) return false;
			return l_Address.match(/^[#.0-9a-zA-Z\s,-]+$/);
		}

		// asserts the postal code is valid
		static TestCodePostal(pCP){
			return pCP.length>3 && pCP.length<6 && pCP.match(/^(0[1-9]{0,1}|[1-9][0-9]{0,1})[0-9]{0,3}$/);
		}

		// asserts attributes of the specified object match template and all attributes are present and filled
		static ValidateObject(pTemplate, pObj){
			for (let i in pTemplate){
				// verify all attributes are available
				if (!Validator.ValidateField(pObj,i, pTemplate[i])) {
					throw new Error(`missing attribute "${i}" for object`);
				}
				// for string attribute : verify the value is not empty
				if (pTemplate[i]=="string" && pObj[i].trim()==""){
					throw new Error(`object has an empty attribute "${i}"`);
				// for array attribute : verify the array contains at least one object
				}else if(pTemplate[i]=="array" && pTemplate[i].length<1){
					throw new Error(`object has an empty array for attribute "${i}"`);
				}
			}
			return true;
		}
}
