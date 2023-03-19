import React,{useState,useEffect, useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';


import 'core-js';
import 'regenerator-runtime/runtime';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';
import { response } from 'express';

const defaultUrl='http://'+location.host;

const midUrl='/battle';
const themaUrl=defaultUrl+midUrl+'/them/url';
const themaOneUrl=defaultUrl+midUrl+'/one';
const themaTwoUrl=defaultUrl+midUrl+'/two';
const themaThreeUrl=defaultUrl+midUrl+'/three';
const themaFourUrl=defaultUrl+midUrl+'/four';
const themaFiveUrl=defaultUrl+midUrl+'/five';
const themaSixUrl=defaultUrl+midUrl+'/six';



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
            <h2>テーマ</h2>
            <div className="header-jump">
                <a href={defaultUrl}>メイン画面へ</a>
            </div>
        </div>
    )
}

function ThemaMid(){

    const [themaUrl,setThemaUrl]=useEffect(['','','','','']);

    const getAwaitFunc=async()=>{
        //GET通信
        await fetch(themaUrl).then(response=>response.json())
        .then(function(data){
            setThemaUrl(data);
        });
    }


    useLayoutEffect(()=>{
        getAwaitFunc();
    },[]);

    return(
        <div className="mid-wrapper">
            <div className="mid-container">
                <div>仕事編</div>
                <a href={themaOneUrl}>{themaUrl[0]}</a>
                <a href={themaTwoUrl}>早くも出世コースに乗った時のマウント</a>

                <div>飲み会編</div>
                <a href={themaThreeUrl}>誰よりも飲める自信がある時のマウント</a>
                <a href={themaFourUrl}>ウケをとった時のマウント</a> 

                <div>学校編</div>
                <a href={themaFiveUrl}>給食のおかわりじゃんけんで買った時のマウント</a>
                <a href={themaSixUrl}>小テストが満点の時のマウント</a>
                
            </div>
        </div>
    )
}


window.onload=()=>ReactDOM.render(<Thema />,document.getElementById('thema'));