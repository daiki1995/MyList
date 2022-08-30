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

function Battle(){

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

            //POST通信
            postData(battleServer,{id:table[0],color:table[1],word:table[2]})
            .then(data=>{
                console.log(JSON.stringify(data))
            }).catch(error=>console.error(error));

            //GET通信
            fetch(battleServer).then(response=>response.json())
            .then(function(data){
                setAlready(data);
            });
            //console.log(already[0].table_blue_word);

            setFlg(false)
        }

    });

    useLayoutEffect(()=>{
        getAwaitFunc();
        console.log("初回読み込み");
        console.log(already[0].table_blue_word);
    },[])
    

    return(
        <div>
            <div>TABLE 1</div>
            <Table tableId='1' setTable={setTable} setFlg={setFlg} already={already}></Table>
            <div>TABLE 2</div>
            <Table tableId='2' setTable={setTable} setFlg={setFlg} already={already}></Table>
            <div>TABLE 3</div>
            <Table tableId='3' setTable={setTable} setFlg={setFlg} already={already}></Table>
            <div>TABLE 4</div>
            <Table tableId='4' setTable={setTable} setFlg={setFlg} already={already}></Table>
        </div>
    )
}

function Table(props){
    const [word,setWord]=useState("");
    
    const[modalOpen,setOpen]=useState(false);

    const[color,setColor]=useState('');

    function subBut(){
        
        
        switch(color){
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
        setColor('red')
        setWord("")
        setOpen(true)
    }

    function cblue(){
        setColor('blue')
        setWord("")
        setOpen(true)
    }

    return(
        <div className="battletable">

            <div className="battletable">
                <div>{props.already[props.tableId-1].table_red_word}</div>
                <button onClick={()=>cred()}>RED</button>
                <div>{props.already[props.tableId-1].table_blue_word}</div>
                <button onClick={()=>cblue()}>BLUE</button>
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