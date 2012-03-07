var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var conn = mongoose.connect('mongodb://localhost/shared_cinema');

var userSchema = new Schema({
    user_id     : ObjectId
  , fb_user_id  : {type: Number, index: {unique: true}}
  , name        : String
  , initials    : String
  , last_login  : Date
});

var upvoteSchema = new Schema({
    vote_id  : ObjectId
  , user_id  : ObjectId
});

var rankedQueueItemSchema = new Schema({
    item_id       : ObjectId
  , url           : String
  , video_id      : String
  , thumbnail_url : String
  , title         : String
  , created_by    : String
  , votes         : Number
  , upvotes       : [upvoteSchema]
  , added_by      : Number
  , added_at      : Date
  , finished_at   : Date
  , playing       : Boolean
});

exports.User = conn.model('User', userSchema);
exports.Upvote = conn.model('Upvote', upvoteSchema);
exports.RankedQueueItem = conn.model('RankedQueueItem', rankedQueueItemSchema);