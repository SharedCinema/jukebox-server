//routes
app.get("page1/:action", function(req, res) {
  switch(req.params.action) {
    case 'delete':
      // delete 'action' here..
      break;
    case 'modify':
      // delete 'modify' here..
      break;
    case 'add':
      // delete 'add' here..
      break;
    default:
      throw new NotFound(); // 404 since action wasn't found
      // or you can redirect
      // res.redirect('/404');
  }
}