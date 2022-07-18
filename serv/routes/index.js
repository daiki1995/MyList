
var express = require('express');

var router = express.Router();

let loginName;
let loginPass;
let acceptName;

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


//メインページ
router.get('/', function(req, res, next) {
  res.sendfile(process.cwd()+'/serv/views/index.html');
  console.log("結果" + acceptName);
});


//ログインページ
router.get('/Login',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/login.html');
  loginName="";
});

//ログインデータの送信
router.post('/Login/api',function(req,res,next){
  //ログインデータを受けとってDBとの整合性が取れているかを確認

  loginName=req.body.name;
  loginPass=req.body.pa;
  
 });
 

//ログインチェック
router.get('/Login/api',function(req,res,next){
  //読み込んだ結果を返す
  
  const qLogin = 'SELECT user_name,user_pas FROM user WHERE user_name=? AND user_pas=?'
  
  
  conection.connect((err)=>{
    conection.query(qLogin,[loginName,loginPass],function(err, results, fields){
      if (err) throw err;
      
      console.log(results);
      if (results[0]==undefined){
        acceptName="";
        console.log("存在しません");
        res.send({"ck":false});
      }else{
        acceptName=results[0].user_name;
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
  const qAddDate='INSERT INTO user SET ?';
  const qLogin = 'SELECT user_name,user_pas FROM user WHERE user_name=?';

  
  conection.connect((err)=>{

    conection.query(qLogin,req.body.name,function(err,results,fields){
      
      
      if (results[0]==undefined){
        console.log("使用可能");
        conection.query(qAddDate,{user_id: null,user_name: req.body.name,user_pas: req.body.pa,user_record_date: datetime},function (err, results, fields) {
          if (err) throw err;
          console.log(results)
          res.send({'ck':true});
        });
        
      }else{
        console.log("使用不可");
        res.send({'ck':false});
      }
    })
    
  });
  
  
});

//「しょうさい」ページ
router.get('/detail',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/detail.html');
});


module.exports = router;
