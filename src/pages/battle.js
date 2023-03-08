import React,{useState,useEffect,useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import 'core-js';
import 'regenerator-runtime/runtime';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';

Modal.setAppElement('#battle');

const defaultUrl='http://'+location.host
const battleUrl=defaultUrl+'/battle';

const battleServer=defaultUrl + "/battle/rend"
//const battleServerRerend=defaultUrl+"/battle/re_rend"
//const battleTableServer=defaultUrl+'/battle/tabel_url'
const deadlineServer=defaultUrl+"/battle/deadline"
const battleServerPost=defaultUrl+'/battle/post'

const themaServer=defaultUrl+'/battle/thema_get'
const themaUrl=defaultUrl+'/battle/thema'

let battle=location.href;

function Battle(){
    return(
        <div>
            <BattleHeder/>
            <BattleMid/>
        </div>
    )
}

function BattleHeder(){

    const [thema,setThema]=useState('');
    const [url,setUrl]=useState('');

    function postData(url='',data={}){
        const req={
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=utf-8",
                
            },
            body:JSON.stringify(data),
        }
        
        //console.log(data);
    
        return fetch(url,req).then(response => response.json());
    }
    

    const getAwaitFunc=async()=>{

        setUrl(battle.substring(battle.indexOf('battle')+('battle').length));

        //GET通信(使用するテーブルを決める)
        await postData(themaServer,{url:battle.substring(battle.indexOf('battle')+('battle').length)})
        .then(function(data){
            //console.log('テーマ'+data.thema);
            setThema(data.thema);
        });
    }

    useLayoutEffect(()=>{
        getAwaitFunc();
    },[]);

    return(
        <div className="header-d-battle">
            <h2>バトる！</h2>
            <div>マウントテーマ：{thema}</div>
            <div className="header-jump">
                <a href={themaUrl}>テーマ選択へ</a>
            </div>
            
        </div>
    )
}

function BattleMid(){

    const [table,setTable]=useState([]);
    const [already,setAlready]=useState(["","","","",""]);
    const [flg,setFlg]=useState(false);
    const [url,setUrl]=useState('');

    function postData(url='',data={}){
        const req={
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=utf-8",
                
            },
            body:JSON.stringify(data),
        }
        
        //console.log(data);
    
        return fetch(url,req).then(response => response.json());
    }

    const getAwaitFunc = async()=>{
        console.log('貴様！見ているな！！！！！！')
        //GET通信(使用するテーブルを決める)
        /*
        await fetch(battleTableServer).then(response=>response.json())
        .then(function(data){
            console.log(data.url)
            setUrl(data.url)
        });*/

        setUrl(battle.substring(battle.indexOf('battle')+('battle').length));//URLの最後の部分を取得してテーブルを決める

        //GET通信
        await postData(battleServer,{url:battle.substring(battle.indexOf('battle')+('battle').length)})
        .then(function(data){
            setAlready(data);
        });
    }

    useEffect(()=>{
        //console.log(already);

        if(flg){
            
            if(table[1]=='deadline'){
                //POST通信
                postData(deadlineServer,{id:table[0]})
                .then(data=>{
                    window.location.href = '/battle'+url;
                }).catch(error=>console.error(error));
            }else{
                //POST通信
                postData(battleServerPost,{id:table[0],inst:table[1],word:table[2]})
                .then(data=>{
                    //console.log('読み込み');
                    window.location.href = '/battle'+url;
                }).catch(error=>console.error(error));
            }
            
            /*
            //GET通信　これをPOSTに変更してURLを保つ？
            postData(battleServerRerend,{url:url}).then(data=>{
                console.log(data);
                setAlready(data);
            }).catch(error=>console.error(error));
            */
            setFlg(false)
        }

    });

    
    useLayoutEffect(()=>{
        getAwaitFunc();
    },[])
    

    return(
        <div>
            <div className="mid-wrapper">
                <div className="mid-container">
                    {[1,2,3,4,5].map((value)=> <div key={value}>
                        <div>TABLE{value}</div>
                        <Table tableId={value} setTable={setTable} setFlg={setFlg} already={already}></Table>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

function Table(props){
    const [word,setWord]=useState("");
    
    const[modalOpen,setOpen]=useState(false);

    const[inst,setInst]=useState('');

    const[deadlineCss,setDeadCss]=useState('');

    useEffect(()=>{
        //console.log('テーブル読み込み')
        //console.log(props.already[props.tableId-1].reception_flg);
        
        if(props.already[props.tableId-1].table_blue_word==null || props.already[props.tableId-1].table_red_word==null || props.already[props.tableId-1].reception_flg=='T'){
            //console.log('条件に合わない')
            setDeadCss('deadline-button')
        }else{
            setDeadCss('');
        }
        
        //console.log((props.tableId)+deadlineCss);
    });

    function subBut(){
        
        switch(inst){
            case 'red':
                //console.log(word);
                props.setTable([props.already[props.tableId-1].table_id,'red',word])
                break
            
            case 'blue':
                //console.log(word);
                props.setTable([props.already[props.tableId-1].table_id,'blue',word])
                break
            
            default:
                //console.log("default")
        }

        props.setFlg(true)
        setOpen(false)

    }

    function cred(){
        setInst('red')
        setWord("")
        setOpen(true)
    }

    function cblue(){
        setInst('blue')
        setWord("")
        setOpen(true)
    }

    function cDead(){
        setInst('deadline')
        props.setTable([props.already[props.tableId-1].table_id,'deadline',''])
        props.setFlg(true)
        
        //console.log(props.already);
        //console.log(props.already[props.tableId-1].reception_flg=='F'? props.already[props.tableId-1].table_blue_word==null? props.already[props.tableId-1].table_red_word==null? 'どっちも空欄でF':'赤は空欄じゃない':'青は空欄じゃない':'どっちも空欄じゃない');
    }

    return(
        
        <div className="battletable">

            <div className="battletable-rese-button">
                <button className={deadlineCss} onClick={()=>cDead()}>投票開始</button>
                <div className={props.already[props.tableId-1].reception_flg=='F'? 'deadline-button':'sitll-vote'}>投票中</div>
            </div>

            <div>
                <div>{props.already[props.tableId-1].table_red_word}</div>
                <button className={props.already[props.tableId-1].reception_flg=='F'? 'battlebutton-red':'deadline-button'} onClick={()=>cred()}>赤コーナー</button>
                <div className={props.already[props.tableId-1].reception_flg=='F'? 'deadline-button':'battle-text-red'}>赤コーナー</div>

                <div>{props.already[props.tableId-1].table_blue_word}</div>
                <button className={props.already[props.tableId-1].reception_flg=='F'? 'battlebutton-blue':'deadline-button'} onClick={()=>cblue()}>青コーナー</button>
                <div className={props.already[props.tableId-1].reception_flg=='F'? 'deadline-button':'battle-text-blue'}>青コーナー</div>
            </div>
            

                <Modal isOpen={modalOpen}
                    onRequestClose={()=>setOpen(false)}
                >
                    <div>ワードを入力</div>
                    <input onChange={(e)=>setWord(e.target.value)}></input>

                    <button onClick={(e)=>subBut(word)}>投稿</button> 
                </Modal>
        </div>
        
    )

}


window.onload=()=>ReactDOM.render(<Battle />,document.getElementById('battle'));