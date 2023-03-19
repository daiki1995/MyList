
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


//「バトる！」ページ
router.get('/',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    //送信
    res.sendfile(process.cwd()+'/serv/views/battle.html');
    
});


router.get('/thema_table',function(req,res,next){
  conection.query('SELECT * FROM thema',function(err,results,fields){
      if (err) throw err;
      //console.log(results);
      res.send(results);
  });
});
  
//「各テーマ」→「バトる！」ページへの読み込み
router.get('/one',function(req,res,next){
  //時刻の状態に応じて締切か否かを決定する
  autoResFlg.chResFlg(autoResFlg.nowDataTime());
  
  //送信
  res.sendfile(process.cwd()+'/serv/views/battle.html');
});
  
//「各テーマ」→「バトる！」ページへの読み込み
router.get('/two',function(req,res,next){
  //時刻の状態に応じて締切か否かを決定する
  autoResFlg.chResFlg(autoResFlg.nowDataTime());

  //送信
  res.sendfile(process.cwd()+'/serv/views/battle.html');
});
  
  //「各テーマ」→「バトる！」ページへの読み込み
  router.get('/three',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    
    //送信
    res.sendfile(process.cwd()+'/serv/views/battle.html');
    
  });

  //「各テーマ」→「バトる！」ページへの読み込み
  router.get('/four',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    
    //送信
    res.sendfile(process.cwd()+'/serv/views/battle.html');
    
  });

  //「各テーマ」→「バトる！」ページへの読み込み
  router.get('/five',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    
    //送信
    res.sendfile(process.cwd()+'/serv/views/battle.html');
    
  });

  //「各テーマ」→「バトる！」ページへの読み込み
  router.get('/six',function(req,res,next){
    //時刻の状態に応じて締切か否かを決定する
    autoResFlg.chResFlg(autoResFlg.nowDataTime());
    
    //送信
    res.sendfile(process.cwd()+'/serv/views/battle.html');
    
  });
  
  //「テーマ」ページ（テスト）
  router.get('/thema',function(req,res,next){
    
    //送信
    res.sendfile(process.cwd()+'/serv/views/themaBattle.html');
  });

  //「バトる!」ページへテーマを渡すGET通信
  router.post('/thema_get',function(req,res,next){
    const qGetThema = 'SELECT * FROM thema WHERE thema_url=?' 

    console.log('リクエスト'+req.body.url);
    conection.query(qGetThema,req.body.url,function(err,results,fields){
      if (err) throw err;
      console.log(results);
      console.log(results[0].thema_text);
      res.send({thema:results[0].thema_text});
    });

  })
  
  //「バトる！」ページ 「投稿」ボタンクリック
  router.post('/post',function(req,res,next){
    
    const qTableSetRed ='UPDATE battle SET table_red_word=? WHERE table_id=?';
    const qTableSetBlue = 'UPDATE battle SET table_blue_word=? WHERE table_id=?';
  
    //const datetime = autoResFlg.nowDataTime();
  
    let qTableSet;
    let setData;
  
    switch(req.body.inst){
      case 'red':
        qTableSet=qTableSetRed;
        setData=req.body.word;
        console.log(qTableSet);
        break;
  
      case 'blue':
        qTableSet=qTableSetBlue;
        setData=req.body.word;
        console.log(qTableSet);
        break;
      
  
      default:
        console.log(req.body.inst)
        console.log("default");
    }
  
    conection.query(qTableSet,[setData,req.body.id],function(err,results,fields){
      if (err) throw err;
      console.log(results);
      res.send({'ck':true});
    });
    
  });
  
  //「バトる！」のページで投票の締切を行う
  router.post('/deadline',function(req,res,next){
  
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
      
  
      conection.query('UPDATE battle SET table_record_data=?,reception_flg=? WHERE table_id=?',[autoResFlg.nowDataTime(),setV,req.body.id],function(err,results,fields){
        if (err) throw err;
  
        if(setV=='T'){
          res.send({'dead':true});
        }else{
          res.send({'dead':false});
        }
    
      });
  
    });
  
  });
  
  //「バトる!」ページに現在のテーブルの状態を渡す
  router.post('/rend',function(req,res,next){
    conection.query('SELECT * FROM battle WHERE url=?',req.body.url,function(err,results,fields){
      if (err) throw err;
      console.log(results);
      res.send(results);
    });
    
  });

  /*
  router.post('/re_rend',function(req,res,next){
    console.log(req.body.url);
    conection.query('SELECT * FROM battle WHERE url=?',req.body.url,function(err,results,fields){
      if (err) throw err;
      console.log(req.body.url);
      res.send(results);
    });
    
  });
  */



module.exports = router;
  