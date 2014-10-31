var express = require('express');
//your code here
var port = process.env.PORT || 3000;
var app = express();
var router = express.Router();

router.get('/time', function(req, res) {
  var today = new Date();
  res.send(today.toLocaleTimeString());
});

router.get('/greeting/:name', function(req, res) {
  var data = {
    msg: 'Hello ' + req.params.name + '!'
  };

  res.json(data);
});

app.use('/', router);
app.listen(port);
console.log('Server started on port', port);
