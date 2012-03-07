function populateQueue(callback) {
  var queueData = {};
  
  models.RankedQueueItem.find({finished_at: null}).sort("votes", "descending").limit(10).execFind(function (err, docs) {
    queueData.top10 = docs;
    models.RankedQueueItem.findOne({playing: true}, function (err, doc) {
      queueData.playing = doc;
      callback(queueData);
    });
  });
}

function addItemToRankedQueue(data, db_callback) {
  var newItem = new models.RankedQueueItem();
  newItem.url = data.url;
  newItem.video_id = data.video_id;
  newItem.title = data.title;
  newItem.created_by = data.author;
  newItem.thumbnail_url = data.thumbnail_url;
  newItem.added_at = Date.now;
  newItem.votes = 0;
  models.User.findOne({user_id: data.user_id}, db_callback);
};

function updateQueue(socket) {
  populateQueue(function(data) {
    socket.broadcast.emit("update_queue", data);
  });
}