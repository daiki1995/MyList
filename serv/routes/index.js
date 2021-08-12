var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/', function(req, res, next) {
  res.sendfile(process.cwd()+'/serv/views/index.html');
});


router.get('/MyList',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/index.html');
});


module.exports = router;
