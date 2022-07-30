import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import 'core-js';
import 'regenerator-runtime/runtime';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';

Modal.setAppElement('#battle');

function Battle(){

    const [table,setTable]=useState([]);

    useEffect(()=>{
        console.log(table);
    })

    return(
        <div>
            <div>TABLE 1</div>
            <Table tableId='1' setTable={setTable}></Table>
            <div>TABLE 2</div>
            <Table tableId='2' setTable={setTable}></Table>
            <div>TABLE 3</div>
            <Table tableId='3' setTable={setTable}></Table>
            <div>TABLE 4</div>
            <Table tableId='4' setTable={setTable}></Table>
        </div>
    )
}

function Table(props){
    const [red,setRed]=useState("");
    const [blue,setBlue]=useState("");
    
    const[modalOpen,setOpen]=useState(false);

    const[color,setColor]=useState('');


    useEffect(()=>{
        
    })

    function subBut(){
        
        //console.log(color)
        switch(color){
            case 'red':
                setRed("")
                props.setTable([props.tableId,'red',red])
                break
            
            case 'blue':
                setBlue("")
                props.setTable([props.tableId,'blue',blue])
                break
            
            default:
                console.log("default")
        }
        setOpen(false)

    }

    function cred(){
        setColor('red')
        setOpen(true)
    }

    function cblue(){
        setColor('blue')
        setOpen(true)
    }

    return(
        <div className="battletable">
            <div></div>
            <button onClick={()=>cred()}>RED</button>
            <div></div>
            <button onClick={()=>cblue()}>BLUE</button>

            <Modal isOpen={modalOpen}
                    onRequestClose={()=>setOpen(false)}
            >
                <div>ワードを入力</div>
                <input></input>

                <button onClick={()=>subBut()}>投稿</button> 
            </Modal>
        </div>
    )

}


window.onload=()=>ReactDOM.render(<Battle />,document.getElementById('battle'));