import React,{useState,useEffect, useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';


import 'core-js';
import 'regenerator-runtime/runtime';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';

const defaultUrl='http://'+location.host;

const midUrl='/judgement';
const themaUrl=defaultUrl+midUrl+'/thema_table';
const themaDehaultUrl=defaultUrl+midUrl;


function Thema(){
    return (
        <div>
            <ThemaHeder/>
            <ThemaMid/>
        </div>
    )
}

function ThemaHeder(){
    return(
        <div className="header-d-thema">
            <h2>ひょうかしたいテーマ</h2>
            <div className="header-jump">
                <a href={defaultUrl}>メイン画面へ</a>
            </div>
        </div>
    )
}

function ThemaMid(){

    const [thema,setThema]=useState(['','','','','','']);

    
    const getAwaitFunc = async()=>{
        //GET通信
        await fetch(themaUrl).then(response=>response.json())
        .then(function(data){
            
            setThema(data);
            console.log(thema)
        });
    }


    useLayoutEffect(()=>{
        getAwaitFunc();
    },[]);

    return(
        <div className="mid-wrapper">
            <div className="mid-container">
                <div>仕事編</div>
                <a href={themaDehaultUrl+thema[0].thema_url}>{thema[0].thema_text}</a>
                <a href={themaDehaultUrl+thema[1].thema_url}>{thema[1].thema_text}</a>

                <div>飲み会編</div>
                <a href={themaDehaultUrl+thema[2].thema_url}>{thema[2].thema_text}</a>
                <a href={themaDehaultUrl+thema[3].thema_url}>{thema[3].thema_text}</a>

                <div>学校編</div>
                <a href={themaDehaultUrl+thema[4].thema_url}>{thema[4].thema_text}</a>
                <a href={themaDehaultUrl+thema[5].thema_url}>{thema[5].thema_text}</a>

            </div>
        </div>
    )
}


window.onload=()=>ReactDOM.render(<Thema />,document.getElementById('thema'));