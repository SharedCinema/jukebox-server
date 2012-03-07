describe('content_queue', function() {

  describe('add item to queue', function() {
    it('should be added if given a vimeo url');
    it('should not be added if given anything other than a vimeo url');
  });

  describe('upvote item in queue', function() {
    it('should have an incremented rank');
    it('should only get upvoted if the user hasn\'t already upvoted');
  });

  describe('add existing item to queue', function() {
    it('should behave like an upvote');
  });

  describe('video finished playing', function() {
    it('should be removed from the queue');
  });

  describe('get whole queue', function() {
    it('should contain the top 11 videos in the queue');
  });

  describe('top 11 queue changes', function() {
    it('should notify all other listening sockets with the new queue');
  })

});
