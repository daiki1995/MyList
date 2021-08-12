import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './front/App.js';


import './css/style.css'
import './css/normalize.css'
import './css/skeleton.css'



console.log("Test");
window.onload=()=>ReactDOM.render(<App />,document.getElementById('app'));