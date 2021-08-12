import React,{useState,useEffect}  from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import '../css/style.css';
import '../css/normalize.css';
import '../css/skeleton.css';

Modal.setAppElement('#app');

const modalStyles = {
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.2)'
      }
  };

function App(){

    const[cont,setCont]=useState();
    
    return(
        <div>
            <Headers/>
            <Submission/>
            <TimeLine/>
        </div> 
    )

    function Headers(){
        return(
            <div className="header-d">
                <h2>MyList</h2>
            </div>
        )
    }

    function Submission(){

        const[modalOpen,setOpen]=useState(false);
        const[str,setStr]=useState("");
        
        
        function subBut(){
            setCont(
                <div className="cont">{str}</div>
                )//ここが投稿結果になる。
            setOpen(false);
        }

        return(
            <div　className="submission">
                <button onClick={()=>setOpen(true)}>
                    投稿
                </button>

                <Modal isOpen={modalOpen}
                    onRequestClose={()=>setOpen(false)}
                    style={modalStyles}
                >
                    <div className="submission">
                        <textarea className="subInput"　
                            rows="6" cols="40" 
                            onChange={(e)=>setStr(e.target.value)}>
                        </textarea>

                        <button onClick={()=>subBut()}>投稿</button> 
                    </div>
            
                </Modal>
            </div>
        )
    }

    
    function TimeLine(){

        
        return(
            <div>
                {cont}
            </div>
        )
    }
    
}

export default App;

