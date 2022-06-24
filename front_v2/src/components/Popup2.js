import React from "react";
import './Popup.css'
const Popup = props => {
  return (
    <div className="popup-box1">
      <div className="box1">
        {/*<span className="close-icon" onClick={props.handleClose}>x</span>*/}
        {props.content}
        <button onClick={props.handleClose} className='butttt'>close</button>
      </div>
    </div>
  );
};
 
export default Popup;