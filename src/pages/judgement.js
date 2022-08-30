import React,{useState,useEffect,useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';

import 'core-js';
import 'regenerator-runtime/runtime';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';

const defaultUrl='http://'+location.host
const voteServer=defaultUrl+'/judgement/vote'
const deadServer=defaultUrl+'/judgement/deadline'
const battleServer=defaultUrl + "/battle/api"
const resultServer=defaultUrl + "/result/click"


function Judgement(){

    const [already,setAlready]=useState(["","","","",""])//現在のテーブル
    const [voteColor,setVoteColor]=useState()//投票色
    const [voteflg,setVoteFlg]=useState(false)//投票のFLG
    const [deadflg,setDeadSetFlg]=useState(false)//締切のFLG
    const [ansId,setAnsId]=useState(0)//投票のテーブルID
    const [deadId,setDeadId]=useState(0)//締切のテーブルID
    const [deadCK,setDeadCK]=useState(false)//締め切ったか否か

    function postData(url='',data={}){
        const req={
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=utf-8",
                
            },
            body:JSON.stringify(data),
        }
        
        console.log(data);
    
        return fetch(url,req).then(response => response.json());
    }

    const getAwaitFunc = async() =>{

        //GET通信
        await fetch(battleServer).then(response=>response.json())
        .then(function(data){
            console.log(data);
            setAlready(data)
        });
    }

    useEffect(()=>{

        //投票
        if(voteflg){
            //POST通信
            postData(voteServer,{id:ansId,color:voteColor})
            .then(data=>{
            console.log(JSON.stringify(data))
            }).catch(error=>console.error(error));
            setVoteFlg(false)
        }

        //締切
        if(deadflg){
           //POST通信
           postData(deadServer,{id:deadId})
           .then(function(data){
            setDeadCK(data.dead)
            console.log(deadCK)
           }).catch(error=>console.error(error));

           
           setDeadSetFlg(false) 
        }

        //結果画面に移動
        if(deadCK){
           //POST通信
           postData(resultServer,{id:deadId})
           .then(data=>{
            console.log(JSON.stringify(data))
           }).catch(error=>console.error(error));

           window.location.href = '/result';
           
        }

    })


    useLayoutEffect(()=>{
        getAwaitFunc();
    },[]);

    function deadline(tableid){
        setDeadId(tableid+1)
        setDeadSetFlg(true)
    }

    return(
        <div>
        
            <div>TABLE1</div>
            <button onClick={()=>deadline(0)}>締切</button>
            <Table id={0} already={already} setVoteColor={setVoteColor} setFlg={setVoteFlg} setAnsId={setAnsId}/>

            <div>TABLE２</div>
            <button onClick={()=>deadline(1)}>締切</button>
            <Table id={1} already={already} setVoteColor={setVoteColor} setFlg={setVoteFlg} setAnsId={setAnsId}/>

            <div>TABLE3</div>
            <button onClick={()=>deadline(2)}>締切</button>
            <Table id={2} already={already} setVoteColor={setVoteColor} setFlg={setVoteFlg} setAnsId={setAnsId}/>

            <div>TABLE4</div>
            <button onClick={()=>deadline(3)}>締切</button>
            <Table id={3} already={already} setVoteColor={setVoteColor} setFlg={setVoteFlg} setAnsId={setAnsId}/>

            <div>TABLE5</div>
            <button onClick={()=>deadline(4)}>締切</button>
            <Table id={4} already={already} setVoteColor={setVoteColor} setFlg={setVoteFlg} setAnsId={setAnsId}/>
        </div>
        
    )
}

function Table(props){

    function voteBut(color){
        props.setVoteColor(color)
        props.setFlg(true)
        props.setAnsId(props.id+1)
    }

    return(
        <div　className='judgetable'>
            <div>{props.already[props.id].table_red_word}</div>
            <button onClick={()=>voteBut('red')}>投票</button>
            <div>{props.already[props.id].table_blue_word}</div>
            <button onClick={()=>voteBut('blue')}>投票</button>
        </div>
    )
}


window.onload=()=>ReactDOM.render(<Judgement />,document.getElementById('judgement'));