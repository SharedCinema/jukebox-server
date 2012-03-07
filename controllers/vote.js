exports.setup = function (action, socket) {
	var vote = action.vote; //received a vote

	socket.broadcast("api", function() {
	  //do server stuff with vote here

	  //send all clients the vote
	  return {
	    data: {
	      vote: vote
	    },
	    action: updateVotes //get the idea of how we basically send objects back and forth?
	  }
	});
};








socket.on("upvote", function(data) {
  var queueItem = data.queueItem;
  models.RankedQueueItem.find(queueItem, function(err, item) {
    if(!item) {
      //error case
      socket.emit("upvote_error", "Ranked Queue Item not found");
    } else {
      console.log(item.upvotes);
    }
  });
});