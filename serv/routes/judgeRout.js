
var express = require('express');

var router = express.Router();

router.use(express.json());

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
    
      const qGetBattleTable='SELECT table_id,table_record_data FROM battle';
      const qSetReception = 'UPDATE battle SET Voting_flg=? WHERE table_id=?';
  
      conection.query(qGetBattleTable,function(err,results,fields){
        results.forEach((elem,index)=>{
          let comparison=(nowData-elem.table_record_data)/(60*60*1000);
        
          if(!!elem.table_record_data){//!!によってnullをfalseに変換することができる（nullの排除）
          
            console.log("オート締切機動")
            
            //時間評価
            if(comparison>60){
  
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
  

//「ひょうか」ページ
router.get('/',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
  
    res.sendfile(process.cwd()+'/serv/views/judgement.html');
});

//「ひょうか」のテーマごとの奴
router.get('/thema',function(req,res,next){
    res.sendfile(process.cwd()+'/serv/views/themaJudg.html');
});

//「ひょうか」のテーマテーブルを取得
router.get('/thema_table',function(req,res,next){

    conection.query('SELECT * FROM thema',function(err,results,fields){
        if (err) throw err;
        res.send(results);
    });

});

//「バトる!」ページへテーマを渡すGET通信
router.post('/thema_get',function(req,res,next){

    const qGetThema = 'SELECT * FROM thema WHERE thema_url=?' 
    console.log(req.body.url)

    conection.query(qGetThema,[req.body.url],function(err,results,fields){
      if (err) throw err;
      console.log(results);
      console.log(results[0].thema_text);
      res.send({thema:results[0].thema_text});
    });

})

  //「各テーマ」→「バトる！」ページへの読み込み
router.get('/one',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    //サイトのURLを保存
    battleUrl='/one';
    //送信
    res.sendfile(process.cwd()+'/serv/views/judgement.html');
});
    
//「各テーマ」→「バトる！」ページへの読み込み
router.get('/two',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    //サイトのURLを保存
    battleUrl='/two';
    //送信
    res.sendfile(process.cwd()+'/serv/views/judgement.html');
});

//「各テーマ」→「バトる！」ページへの読み込み
router.get('/three',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    //サイトのURLを保存
    battleUrl='/three';
    //送信
    res.sendfile(process.cwd()+'/serv/views/judgement.html');
      
});

//「各テーマ」→「バトる！」ページへの読み込み
router.get('/four',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    //サイトのURLを保存
    battleUrl='/four';
    //送信
    res.sendfile(process.cwd()+'/serv/views/judgement.html');
      
});


//「各テーマ」→「バトる！」ページへの読み込み
router.get('/five',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    //サイトのURLを保存
    battleUrl='/five';
    //送信
    res.sendfile(process.cwd()+'/serv/views/judgement.html');
      
});

//「各テーマ」→「バトる！」ページへの読み込み
router.get('/six',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    //サイトのURLを保存
    battleUrl='/five';
    //送信
    res.sendfile(process.cwd()+'/serv/views/judgement.html');
      
});
    

router.post('/rend',function(req,res,next){
    
    conection.query('SELECT * FROM battle WHERE url=?',[req.body.url],function(err,results,fields){
        if (err) throw err;
        console.log(results);
        res.send(results);
    });

});
  
  //「ひょうか」のページから投票を行う
router.post('/vote',function(req,res,next){


    conection.connect((err)=>{
        if(err){
          console.log('error connecting: ' + err.stack);
          return;
        }
    });

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
  
  
  //「ひょうか」のページで締切を解除する
router.post('/relese',function(req,res,next){

    conection.connect((err)=>{
        if(err){
          console.log('error connecting: ' + err.stack);
          return;
        }
    });
    
    conection.query('UPDATE battle SET reception_flg=?,table_record_data=? WHERE table_id=?',['F',null,req.body.id],function(err,results,fields){
      if (err) throw err;
      console.log("締切解除")
      res.send({ck:true})
    })

});


module.exports = router;