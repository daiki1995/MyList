
var express = require('express');

var router = express.Router();

let loginName;
let loginPass;
let acceptName;
let resultId=0;
let battleUrl;

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

//時刻の状態に応じて締切か否かを決定する
const autoResFlg={

  nowDataTime:function(){

    //時間をDATA型に変換する。
    let date = new Date();

    const Year=date.getFullYear();
    const Month=date.getMonth()+1;
    const Day=date.getDate();
    const Hour = date.getHours();
    const Min = date.getMinutes();
    const Sec = date.getSeconds();

    const datetime =Year +'-'+Month+'-'+Day+' '+Hour+':'+Min+':'+Sec;

    return datetime;
  },

  chResFlg:function(datetime){
    //時刻の状態に応じて締切か否かを決定する
    const nowData=new Date(datetime);
  
    const qGetBattleTable='SELECT table_record_data FROM battle';
    const qSetReception = 'UPDATE battle SET Voting_flg=? WHERE table_id=?';

    conection.query(qGetBattleTable,function(err,results,fields){
      results.forEach((elem,index)=>{
        let comparison=(nowData-elem.table_record_data)/(60*60*1000);
      
        if(!!elem.table_record_data){//!!によってnullをfalseに変換することができる（nullの排除）
        
          console.log("オート締切機動")
          
          //時間評価
          if(comparison>1){

            //締切FLGをTへ変える。
            conection.query(qSetReception,['T',index+1],function(err,results,fields){
              console.log("切り替え");
            });
          }
        
        }
      
      })
    });
  }
};

//メインページ
router.get('/', function(req, res, next) {
  //時刻の状態に応じて締切か否かを決定する
  autoResFlg.chResFlg(autoResFlg.nowDataTime());

  res.sendfile(process.cwd()+'/serv/views/index.html');
});

//FLGのデータリセット用
router.get('/clear', function(req, res, next){

  const qGetBattleTable='SELECT table_id,table_record_data FROM battle';
  const qSetReception = 'UPDATE battle SET table_record_data=?,reception_flg=?,Voting_flg=? WHERE table_id=?';
  
  conection.query(qGetBattleTable,function(err,results,fields){
    console.log(results)
    
    results.forEach((elem,index)=>{
      if(!!elem.table_record_data){//!!によってnullをfalseに変換することができる（nullの排除）
        
        //FLGをFへ変える。
        conection.query(qSetReception,[null,'F','F',index+1],function(err,results,fields){
          console.log("FLGクリア");
        })
      }
    })
    
  })
  res.sendfile(process.cwd()+'/serv/views/index.html');
});

//ALLデータリセット用
router.get('/clear-all', function(req, res, next){

  const qGetBattleTable='SELECT table_id FROM battle';
  const qSetReception = 'UPDATE battle SET table_red_word=?,table_blue_word=?,table_record_data=?,red_votes=?,blue_votes=?,reception_flg=?,Voting_flg=? WHERE table_id=?';
  
  conection.query(qGetBattleTable,function(err,results,fields){
    console.log(results)
    results.forEach((elem,index)=>{
      
      //FLGをFへ変える。
      conection.query(qSetReception,[null,null,null,0,0,'F','F',index+1],function(err,results,fields){
        console.log("オールクリア");
      })
      
    })
  })
  res.sendfile(process.cwd()+'/serv/views/index.html');
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
  
  const datetime=autoResFlg.nowDataTime();
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


//「結果」発表画面
router.get('/result',function(req,res,next){
  res.sendfile(process.cwd()+'/serv/views/result.html');
});

// 「結果」クリックされたテーブルを教える
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
