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
const battleServer=defaultUrl + "/battle/api"
const deadlineServer=defaultUrl+"/battle/deadline"

function Battle(){
    return(
        <div>
            <BattleHeder/>
            <BattleMid/>
        </div>
    )
}

function BattleHeder(){
    return(
        <div className="header-d-battle">
            <h2>バトる！</h2>
            <div className="header-jump">
                <a href={defaultUrl}>メイン画面へ</a>
            </div>
            
        </div>
    )
}

function BattleMid(){

    const [table,setTable]=useState([]);
    const [already,setAlready]=useState(["","","","",""]);
    const [flg,setFlg]=useState(false);

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

    const getAwaitFunc = async()=>{
        //GET通信
        await fetch(battleServer).then(response=>response.json())
        .then(function(data){
            console.log(data);
            setAlready(data);
        });
    }

    useEffect(()=>{
        //console.log(table);

        if(flg){
            
            if(table[1]=='deadline'){
                //POST通信
                postData(deadlineServer,{id:table[0]})
                .then(data=>{
                    window.location.href = '/battle';
                }).catch(error=>console.error(error));
            }else{
                //POST通信
                postData(battleServer,{id:table[0],inst:table[1],word:table[2]})
                .then(data=>{
                console.log(JSON.stringify(data))
                }).catch(error=>console.error(error));
            }
            

            //GET通信
            fetch(battleServer).then(response=>response.json())
            .then(function(data){
                setAlready(data);
            });

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
                    <div>TABLE 1</div>
                    <Table tableId='1' setTable={setTable} setFlg={setFlg} already={already}></Table>
                    <div>TABLE 2</div>
                    <Table tableId='2' setTable={setTable} setFlg={setFlg} already={already}></Table>
                    <div>TABLE 3</div>
                    <Table tableId='3' setTable={setTable} setFlg={setFlg} already={already}></Table>
                    <div>TABLE 4</div>
                    <Table tableId='4' setTable={setTable} setFlg={setFlg} already={already}></Table>
                    <div>TABLE 5</div>
                    <Table tableId='5' setTable={setTable} setFlg={setFlg} already={already}></Table>
                </div>
            </div>
        </div>
    )
}

function Table(props){
    const [word,setWord]=useState("");
    
    const[modalOpen,setOpen]=useState(false);

    const[inst,setInst]=useState('');

    function subBut(){
        
        switch(inst){
            case 'red':
                console.log(word);
                props.setTable([props.tableId,'red',word])
                break
            
            case 'blue':
                console.log(word);
                props.setTable([props.tableId,'blue',word])
                break
            
            default:
                console.log("default")
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
        props.setTable([props.tableId,'deadline',''])
        props.setFlg(true)
    }

    return(
        
        <div className="battletable">

            <div className="battletable-rese-button">
                <button className={props.already[props.tableId-1].reception_flg=='F'? '':'deadline-button'} onClick={()=>cDead()}>投票開始</button>
            </div>

            <div>
                <div>{props.already[props.tableId-1].table_red_word}</div>
                <button className='battlebutton-red' onClick={()=>cred()}>赤コーナー</button>
                <div>{props.already[props.tableId-1].table_blue_word}</div>
                    <button className='battlebutton-blue' onClick={()=>cblue()}>青コーナー</button>
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