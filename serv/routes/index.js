
var express = require('express');

var router = express.Router();

let loginID;
let loginPass;
let loginName;

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
  console.log("結果" + loginName);
});


router.get('/Login',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/login.html');
});

//ログインデータの送信
router.post('/Login/api',function(req,res,next){
  //ログインデータを受けとってDBとの整合性が取れているかを確認

  loginID=req.body.id;
  loginPass=req.body.pa
  
 });
 

//ログインチェック
router.get('/Login/api',function(req,res,next){
  //読み込んだ結果を返す
  
  const qLogin = 'SELECT user_name,user_pas FROM user WHERE user_name=? AND user_pas=?'
 
  conection.connect((err)=>{
    conection.query(qLogin,[loginID,loginPass],function(err, results, fields){
      if (err) throw err;
      
      if (results[0]==undefined){
        console.log("存在しません");
      }else{
        loginName=results[0].user_name;
        //console.log(loginName);
        res.send({"ck":true});
      }
      
    });
  });
});

//アカウント作成　ゲット
router.get('/login/Creat',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/creatAccount.html');
  console.log(process.cwd());
});

//アカウント作成　ポスト
router.post('/login/Creat/api',function(req,res,next){
  
  let date = new Date();

  const Year=date.getFullYear();
  const Month=date.getMonth()+1;
  const Day=date.getDate();
  const Hour = date.getHours();
  const Min = date.getMinutes();
  const Sec = date.getSeconds();

　
  const datetime =Year +'-'+Month+'-'+Day+' '+Hour+':'+Min+':'+Sec;
  const qAddDate='INSERT INTO user SET ?'

  
  conection.connect((err)=>{

    console.log('success');
    console.log(qAddDate);

    conection.query(qAddDate,{user_id: null,user_name: req.body.id,user_pas: req.body.pa,user_record_date: datetime},function (err, results, fields) {
      if (err) throw err;
      console.log(results)
      conection.end();
    });
  });
  
  
});


module.exports = router;
