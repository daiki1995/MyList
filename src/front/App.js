import React,{useState,useEffect}  from 'react';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';


const detailServ='http://'+location.host

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
                    <MoveP name='しょうさい' url='/detail'></MoveP>
                    <MoveP name='バトる！' url='/battle'></MoveP>
                    <MoveP name='ひょうか' url='/judgement'></MoveP>
                    
                </div>  
            </div>
        )

        function MoveP(props){
            console.log(props.url);
            
            function roadURL(url){
                console.log(detailServ+url);
                window.location.href = detailServ+url;
            }

            return(
                <div className="mid-content">
                    <button className="mid-container-button" onClick={()=>roadURL(props.url)}>{props.name}</button>
                </div>
            )
        }   
    }    
    
}

export default App;

