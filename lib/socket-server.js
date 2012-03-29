var io = require('socket.io');
module.exports = function Server(server) {
	var socket = io.listen(server);
	
	/**
	* @method socket.on()
	* @desc 
	*/
	socket.on('connection', function(socket) {

		console.log("Client Connected");

		socket.on("message", function(data) {
			socket.broadcast.emit("server_message", data);
			socket.emit("server_message", data);
		});
		socket.on("disconnect", function() {
			console.log("Client Disconnected.");
		});

		socket.on("jbapi", function(request) {
			var controller = (request.controller || null);
			var action = (request.action || null);
			var data = (request.data || null);

			if(controller != null && action != null) {
				require("./controllers/" + controller).init(socket, action, data);
			}
		});
	});

	return this;
};