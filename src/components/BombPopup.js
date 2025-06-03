import './css/BombMap.css';
//import ReactDom from "react-dom";

function BombPopup ({Values,open,OnClose}) {

    if(!open){
        return null;
    }

    return /*ReactDom.createPortal*/(
    <>
        <div className='Overlay' onClick={()=>OnClose(false)}></div>
      <div className='BombPopup'>
        <h2>Bomb order:</h2>
            <div>1: {Values[0]}</div>
            <div>2: {Values[1]}</div>
            <div>3: {Values[2]}</div>
            <div>4: {Values[3]}</div>
            <div>5: {Values[4]}</div>
            <div>6: {Values[5]}</div>

      </div>  
    </>//,
    //document.getElementById("portal")
    );
}

export default BombPopup;