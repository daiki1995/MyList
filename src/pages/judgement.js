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
const battleServer=defaultUrl + "/judgement/api"
const resultServer=defaultUrl + "/result/click"
const releseDeadServer=defaultUrl+"/judgement/relese"

const themaServer=defaultUrl+'/judgement/thema_get'
const themaUrl=defaultUrl+'/judgement/thema'

function Judgement(){
    return(
        <div>
            <JudgementHeder/>
            <JudgementMid/>
        </div>
    )
}

function JudgementHeder(){

    const [thema,setThema]=useState('');

    const getAwaitFunc=async()=>{
        //GET通信(使用するテーブルを決める)
        await fetch(themaServer).then(response=>response.json())
        .then(function(data){
            console.log('テーマ'+data.thema);
            setThema(data.thema);
        });
    }

    useLayoutEffect(()=>{
        getAwaitFunc();
    })

    return(
        <div className="header-d-judgement">
            <h2>ひょうか</h2>
            <div>マウントテーマ：{thema}</div>
            <div className="header-jump">
                <a href={themaUrl}>テーマ選択へ</a>
            </div>
        </div>
    )
}

function JudgementMid(){

    const [already,setAlready]=useState(["","","","",""])//現在のテーブル
    const [voteColor,setVoteColor]=useState()//投票色
    const [voteflg,setVoteFlg]=useState(false)//投票のFLG
    const [deadflg,setDeadSetFlg]=useState(false)//締切のFLG
    const [ansId,setAnsId]=useState(0)//投票のテーブルID
    const [deadId,setDeadId]=useState(0)//締切のテーブルID
    //const [deadCK,setDeadCK]=useState(false)//締め切ったか否か
    const [releDeadflg,setReleDflg]=useState(false)//締切解除機能
    const [voteButSw,setvoteButSw]=useState([true,true,true,true,true]);//押したボタンをON-OFFする

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


        //結果画面に移動
        if(deadflg){
           //POST通信
           postData(resultServer,{id:deadId})
           .then(data=>{
            console.log(JSON.stringify(data))
           }).catch(error=>console.error(error));

           window.location.href = '/result';
           
        }

        //締切の解除
        if(releDeadflg){
            console.log(deadId+"解除読み込み")

            //POST通信
           postData(releseDeadServer,{id:deadId})
           .then(function(data){
            if(data.ck){
                console.log("成功")
                window.location.href = '/judgement';
            }
           }).catch(error=>console.error(error));

           
           setReleDflg(false) 
        }
        console.log(already[0].reception_flg=='F'?'TRUE':'FALSE');

    })


    useLayoutEffect(()=>{
        getAwaitFunc();
    },[]);

    return(
        <div>
            <div className="mid-wrapper">
                <div className="mid-container">
            
                    {[0,1,2,3,4].map((value)=> 
                        <div key={value}>
                            <TB id={value}
                                already={already} 
                                setVoteColor={setVoteColor} 
                                setFlg={setVoteFlg} 
                                setAnsId={setAnsId}
                                setDeadId={setDeadId}
                                setDeadSetFlg={setDeadSetFlg}
                                setReleDflg={setReleDflg}
                                voteButSw={voteButSw}
                                setvoteButSw={setvoteButSw}/>
                        </div>)}

                </div>
            </div>
        </div>
        
    )
}

function TB(props){

    function voteBut(color){
        props.setVoteColor(color)
        props.setFlg(true)
        props.setAnsId(props.id+1)
        props.setvoteButSw(
            props.voteButSw.map((sw,index)=>(index==props.id?false:sw))
        )
        
    }

    
    function deadline(tableid){
        props.setDeadId(tableid+1)
        props.setDeadSetFlg(true)
    }
    
/* 投票完了ボタン
    function releseDeadLine(tableid){
        //console.log(tableid+"解除")
        props.setDeadId(tableid+1)
        props.setReleDflg(true)
    }
*/

    return(
        <div>
            <div>TABLE{props.id+1}</div>

            <button　className={props.already[props.id].Voting_flg=='F'?'deadline-comment':''} onClick={()=>deadline(props.id)}>
                結果発表
            </button>

            <div　className={props.already[props.id].Voting_flg=='F'?props.voteButSw[props.id]==true?'deadline-button':'':'deadline-button'}>
                投票完了！！！！！！
            </div>


            <div　className='judgetable-wrap'>
                
                <div className='judgetable-word-red'>赤コーナー</div>

                <div className='judgetable-content'>
                        <div>{props.already[props.id].table_red_word}</div>
                        <button className={props.already[props.id].Voting_flg=='F'?props.voteButSw[props.id]==true?'':'deadline-button':'deadline-button'} onClick={()=>voteBut('red')}>
                            投票
                        </button>
                </div>
            
                <div className='judgetable-word-blue'>青コーナー</div>

                <div className='judgetable-content'>
                        <div>{props.already[props.id].table_blue_word}</div>
                        <button className={props.already[props.id].Voting_flg=='F'?props.voteButSw[props.id]==true?'':'deadline-button':'deadline-button'} onClick={()=>voteBut('blue')}>
                            投票
                        </button>
                </div>
            
            </div>
        </div>
        
    )
}

window.onload=()=>ReactDOM.render(<Judgement />,document.getElementById('judgement'));