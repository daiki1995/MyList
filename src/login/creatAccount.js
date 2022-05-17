import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

import 'core-js';
import 'regenerator-runtime/runtime';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';


const server = "http://localhost:3000/login/Creat"
const serverCreat=server + "/api"


function CreatAccount(){

    function postData(url='',data={}){
        const req={
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=utf-8",
                
            },
            body:JSON.stringify(data),
        }
        
        //console.log(fetch)
        console.log(data);
    
        return fetch(url,req).then(response => response.json());
    }

    
    

    function UserForm(){
        const [ctrlFetch,setctrFetch]=useState(0);
        const [loginId,setloginId]=useState();
        const [pass,setPass]=useState();
        const [eMail,setEmail]=useState();


        function creatClick(){
            setctrFetch(1);
            console.log("Click")
        }

        useEffect(()=>{

            if(ctrlFetch==1){

                postData(serverCreat,{id:loginId,pa:pass,email:eMail})
                .then(data => {
                    console.log(JSON.stringify(data))
                }).catch(error => console.error(error))
            } 
            setctrFetch(0);
        });

        function changeId(e){
            setloginId(e.target.value);
        }

        function changePass(e){
            setPass(e.target.value);
        }

        function changeEmail(e){
            setEmail(e.target.value);
        }

        return(
            <div className="creatAccount">
                <div><input placeholder="UserName" onChange={(e)=>changeId(e)}></input></div>
                <div><input placeholder="e-mail"  onChange={(e)=>changeEmail(e)}></input></div>
                <div><input type="Password" placeholder="PassWord" onChange={(e)=>changePass(e)}></input></div>
                <button onClick={()=>creatClick()}>新規作成</button>
            </div>
        )

        
    }
    

    return(
        
        <div className="loginCont">
            <UserForm/>
        </div>
        
    )

    

}

window.onload=()=>ReactDOM.render(<CreatAccount />,document.getElementById('creatAccount'));