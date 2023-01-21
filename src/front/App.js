
import React,{useState,useEffect}  from 'react';
import Sidebar from 'react-sidebar';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';
import '../css/acordion.css';

const defaultServ='http://'+location.host;
const battleUrl=defaultServ+'/battle/thema';
const judgementUrl=defaultServ+'/judgement/thema'

function App(){

    return(
        <div>
            <Headers/>
            <Mid/>
        </div> 
    )

    function Headers(){
        return(
            <div className="header-d">
                <h2>とうこん！ マウントふぁいと倶楽部</h2>
            </div>
        )
    }

    function Mid(){

        return(
            <div className="mid-wrapper">
                <div className="mid-container">

                    <div className="mid-atag-container">
                        <a  className="mid-atag" href={battleUrl}>バトる！</a>
                        <a  className="mid-atag" href={judgementUrl}>ひょうか</a>
                    </div>
                    
                    <div className="mid-text">
                        <br/>
                        <h2 >はじめに！</h2>
                            <p>
                                みなさん、誰かにワードマウントを取られたことはありますか？<br/>
                                しかし、それは正直平場のマウントです。<br/>
                                ここは、マウント会のトップマウンターが集まるページです。<br/>
                                ここでは、多くのマウンターがしのぎを削ってマウントを取り合っています。<br/>
                            </p>
                    </div>
                    
                </div>
            </div>
        )
        
    }    
    
}

export default App;

