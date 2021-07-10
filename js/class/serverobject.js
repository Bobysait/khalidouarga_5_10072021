
// structur of the back objects
const _C_LEGAL_OBJECT_		=	{
	"_id"			:	"string",
	"name"			:	"string",
	"price"			:	"number",
	"description"	:	"string",
	"imageUrl"		:	"string",
	"colors"		:	"array"
};

class ServerObject {
	// for incoming objects (from the back) : asserts attributes are present
	static ValidateObject(pObj) {
		return Validator.ValidateObject(_C_LEGAL_OBJECT_, pObj);
	}
}
