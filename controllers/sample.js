exports.init = function(socket, action, data) {
	
	var data;

	/**
	* @object sample
	* @desc The Controller
	*/
	var sample = {};

	/**
	* @method sample1
	* @desc a sample controller action
	* @type {Function}
	* @return {Object} data
	*/
	sample.action1 = function() {
		data = {
			controller: "sample",
			action: "sampleaction",
			data: {
				hackathon: "Great way to meet peeps"
			}
		};

		socket.broadcast("jbapi", data); //get the idea of how we basically send objects back and forth?
	};

	/**
	* @object sample[action]
	* @desc Runs requested action
	*/
	sample[action];
};