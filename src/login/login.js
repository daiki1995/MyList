import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

import 'core-js';
import 'regenerator-runtime/runtime';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';

const server = "http://localhost:3000/login"
const ckLogin = server+"/api"
const creatServ=server + "/creat"


function Login(){

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


        function loginClick(){
            setctrFetch(1);
            console.log("Click");
        }

        function changeId(e){
            setloginId(e.target.value);
        }

        function changePass(e){
            setPass(e.target.value);
        }


        useEffect(()=>{

            if(ctrlFetch==1){

                postData(ckLogin,{pa:pass,id:loginId})
                .then(data => {
                    console.log(JSON.stringify(data))
                }).catch(error => console.error(error))

                fetch(ckLogin).then(response=>response.json).then(data=>console.log(data));

            } 
            setctrFetch(0);
        });

        
        return(
            <div className="login">
                <div><input placeholder="UserName" onChange={(e)=>changeId(e)}></input></div>
                <div><input type="Password" placeholder="PassWord" onChange={(e)=>changePass(e)}></input></div>
                <button onClick={()=>loginClick()}>ログイン</button>
            </div>
        )

        
    }
    
    

    return(
        
        <div>
            <div className="loginCont">
                <UserForm/>
                <a href={creatServ}>新規要録はこちら</a>
            </div>
        </div>
        
        
    )

    

}

window.onload=()=>ReactDOM.render(<Login />,document.getElementById('login'));