/* SERVER CONFIG */

	// port defined to connect to the server (back)
	const __C_SERVER_RUN_PORT_1__	=	3000;
	const __C_SERVER_RUN_PORT_2__	=	3001;

	// Global port for connection to server
	let __C_SERVER_RUN_PORT__		=	__C_SERVER_RUN_PORT_1__; // this could be automatically set
														// if the original port was unavailable
														// then a secondary port could be used

	const __C_SERVER_URL__			=	"http://localhost:"+__C_SERVER_RUN_PORT__;
	
class Server {
	static GetPort (){
		return __C_SERVER_RUN_PORT__;
	}
	
	static GetURL (){
		return __C_SERVER_URL__;
	}
}