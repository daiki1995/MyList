import React,{useState,useEffect,useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';

//import { Player } from 'video-react';

import 'core-js';
import 'regenerator-runtime/runtime';
import '../css/skeleton.css';

const defaultUrl='http://'+location.host
const resjudgServer=defaultUrl+'/result/api';
const movieServer=defaultUrl+'/result/getUrl';


function ResJudg(){

    const [winner,serWinner]=useState('')
    const [videoId,setVideoId]=useState('');
    const [resultUrl,setResultUrl]=useState({});

    
    const getAwaitFunc = async() =>{
        //GET通信
        await fetch(movieServer).then(respons=>respons.json())
        .then(function(data){
            console.log(data)
            setResultUrl(data)
        });
        
        await fetch(resjudgServer).then(response=>response.json())
        .then(function(data){
            serWinner(data.result)
        });
    }
    
    useLayoutEffect(()=>{
        getAwaitFunc()
    },[])

    useEffect(()=>{
        console.log(resultUrl[0])
        switch(winner){
            case 'redwin':
                console.log('redwin')
                setVideoId(resultUrl.red_win)
                break
            
            case 'bluewin':
                console.log('bluewin')
                setVideoId(resultUrl.blue_win)
                break
            
            default:
                console.log('default')
                break
        }
    },[winner])

    function back(){
        window.location.href = '/';
    }

    return(
        <div>
            <button onClick={()=>back()}>戻る</button>
            <YouTube videoId={videoId}/>
        </div>
    )
}

window.onload=()=>ReactDOM.render(<ResJudg />,document.getElementById('result'));
