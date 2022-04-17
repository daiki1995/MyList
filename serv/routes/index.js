
var express = require('express');

var router = express.Router();

router.use(express.json());



/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

var mysql = require('mysql');
var conection=mysql.createConnection({
  host:'localhost',
  user:'root',
  database:'mylist',
  password:'Popmen0408!'
});

conection.connect((err)=>{
  if(err){
    console.log('error connecting: ' + err.stack);
    return;
  }
  //console.log('success');
});


router.get('/', function(req, res, next) {
  res.sendfile(process.cwd()+'/serv/views/index.html');
});


router.get('/MyList',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/index.html');
});

//ログイン　ゲット
router.get('/Login',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/login.html');

});

//ログインデータの送信
router.post('/Login/api',function(req,res,next){
  //ログインデータを受けとってDBとの整合性が取れているかを確認
  
    console.log("login");
    console.log(req.body);
 });
 
//ログインチェック
router.get('/Login/api',function(){
  //読み込んだ結果を返す
  console.log("api login");
  

});



//アカウント作成　ゲット
router.get('/login/Creat',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/creatAccount.html');
  console.log(process.cwd());
});

//アカウント作成　ポスト
router.post('/login/Creat/api',function(req,res,next){
  
  var date = new Date();

  const Year=date.getFullYear();
  const Month=date.getMonth()+1;
  const Day=date.getDate();
  const Hour = date.getHours();
  const Min = date.getMinutes();
  const Sec = date.getSeconds();

　
  const datetime =Year +'-'+Month+'-'+Day+' '+Hour+':'+Min+':'+Sec;
  const addDate='INSERT INTO user SET ?'

  
  conection.connect((err)=>{

    console.log('success');
    console.log(addDate);

    conection.query(addDate,{user_id: null,user_name: req.body.id,user_pas: req.body.pa,user_record_date: datetime},function (err, results, fields) {
      if (err) throw err;
      console.log(results)
    });
  });
  
});


module.exports = router;
