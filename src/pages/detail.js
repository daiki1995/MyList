import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

import 'core-js';
import 'regenerator-runtime/runtime';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';


function Detail(){

    return(
        <div>
            <h4>しょうさい！</h4>
            <p>
                みなさん、誰かにワードマウントを取られたことはありますか？<br/>
                しかし、それは正直平場のマウントです。<br/>
                ここは、マウント会のトップマウンターがいるページです。<br/>
                ここでは、多くのマウンターがしのぎを削ってマウントを取り合っています。<br/>
            </p>
        </div>
    )

}

window.onload=()=>ReactDOM.render(<Detail />,document.getElementById('detail'));