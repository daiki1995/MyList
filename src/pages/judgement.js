import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

import 'core-js';
import 'regenerator-runtime/runtime';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';

function Judgement(){

    return(
        <p>judgement</p>
    )
}


window.onload=()=>ReactDOM.render(<Judgement />,document.getElementById('judgement'));