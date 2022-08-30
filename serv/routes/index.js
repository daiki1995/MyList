
var express = require('express');

var router = express.Router();

let loginName;
let loginPass;
let acceptName;
let resultId=0;

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

//「バトる！」ページ
router.get('/battle',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/battle.html');
});

//「投稿」ボタンクリック
router.post('/battle/api',function(req,res,next){
  
  const qtableSetRed ='UPDATE battle SET table_red_word=? WHERE table_id=?'
  const qTableSetBlue = 'UPDATE battle SET table_blue_word=? WHERE table_id=?'

  let qTableSet;

  switch(req.body.color){
    case 'red':
      qTableSet=qtableSetRed;
      console.log(qTableSet);
      break;

    case 'blue':
      qTableSet=qTableSetBlue;
      console.log(qTableSet);
      break;
    
    default:
      console.log("default");

  }

  
  conection.query(qTableSet,[req.body.word,req.body.id],function(err,results,fields){
    if (err) throw err;
    console.log(results);
    res.send({'ck':true});
  });
  
});

router.get('/battle/api',function(req,res,next){
  conection.query('SELECT * FROM battle',function(err,results,fields){
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

//「ひょうか」ページ
router.get('/judgement',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/judgement.html');
});

router.post('/judgement/vote',function(req,res,next){
  const qAddRedVotes ='UPDATE battle SET red_votes=red_votes+1 WHERE table_id=?';
  const qAddBlueVotes='UPDATE battle SET blue_votes=blue_votes+1 WHERE table_id=?';

  let qTableSet;

  switch(req.body.color){
    case 'red':
      qTableSet=qAddRedVotes;
      console.log(qTableSet);
      break;
    
    case 'blue':
      qTableSet=qAddBlueVotes;
      console.log(qTableSet);
      break;
    
    default:
      console.log("default")
    }

    console.log(req.body.id);

    conection.query(qTableSet,[req.body.id],function(err,results,fields){
      if (err) throw err;
      console.log(results);
      res.send(results);
    });

});

router.post('/judgement/deadline',function(req,res,next){

  let setV;

  conection.query('SELECT reception_flg FROM battle WHERE table_id=?',[req.body.id],function(err,results,fields){
    if (err) throw err;
    console.log(results);
    console.log(results[0].reception_flg);

    switch(results[0].reception_flg){
      case 'T':
        setV='F';
        break;
      
      case 'F':
        setV='T';
        break;

      case null:
        setV='T';
        break;
      
      default:
        setV='T';
    }

    conection.query('UPDATE battle SET reception_flg=? WHERE table_id=?',[setV,req.body.id],function(err,results,fields){
      if (err) throw err;

      if(setV=='T'){
        res.send({'dead':true});
      }else{
        res.send({'dead':false});
      }
  
    });

  });

});

//「結果」発表画面
router.get('/result',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/result.html');
});

//クリックされたテーブルを教える
router.get('/result/api',function(req,res,next){
  const qVotes='select red_votes,blue_votes from battle where table_Id=?'
  console.log(resultId)
  conection.query(qVotes,[resultId],function(err,results,fields){

    let redVotes=results[0].red_votes;
    let blueVotes=results[0].blue_votes;
    
    console.log("redresult" +results[0].red_votes)
    console.log("blueresult" +results[0].blue_votes)

    //勝敗比較
   if(redVotes>blueVotes){
      res.send({result:'redwin'})
      console.log("redWIN")
    }else if(blueVotes>redVotes){
      res.send({result:'bluewin'})
      console.log("blueWIN")
    }else{
      res.send({result:'draw'})
      console.log("draw")
    }
  })
});


//Jugdからresultへ
router.post('/result/click',function(req,res,next){
  resultId=req.body.id;
});



module.exports = router;
