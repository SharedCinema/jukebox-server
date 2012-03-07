function create_or_find_user_from_query(models, query, callback) {
  if (!query.id) {
    throw new Error('Tried to create session with invalid data');
  }

  //get or create the user
  models.User.findOne({'fb_user_id': query.id}, function(err, user) {
    if (!user) {
      user = new models.User;
      user.fb_user_id = query.id;
      user.name = query.name;
      user.initials = query.first_name[0] + query.last_name[0];
      user.save(function(err) {
        if (err) {
          console.log("user didn't save");
          console.log(err);
        }
      });
    }
    callback(user);
  });
}

exports.setup = function (server, models) {
  server.post('/session', function(req, res) {
    create_or_find_user_from_query(models, req.body, function(user) {
      if (user) {
        req.session.user = user;
        res.cookie('user_id', user.id);
        res.status = 200;
        res.send();
      } else {
        //errored.
        res.status = 400;
        res.send();
      }
    });
  });
};