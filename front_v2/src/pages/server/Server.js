import React, {useEffect, useState} from 'react'
// import Card from "react-bootstrap/Card";
// import Navbar from 'src/components/Navbar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import * as AiIcons from 'react-icons/ai';
import './server.css'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-modal';
import { FaPlay } from "react-icons/fa";
// import { GlobalStyle } from '../globalStyles';
import swal from 'sweetalert';
// import { useEffect, usetate } from "react";


import 'reactjs-popup/dist/index.css';
import Popup from '/Users/macbookair/front_v2/src/components/Popup';
import axios from 'axios';
import { render } from '@testing-library/react';

import data from "./mock-data.json";
import {nanoid} from 'nanoid';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Server() {
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
    setIsOpen(!isOpen);

  }
// const [count, setCount] = useState('2022-06-04 09:32:24.465770');
// const [contacts, setContacts] = useState(data);
// const [addFormData, setAddFormData] = useState({
//   sessionnb : count,
//   num_rounds:'',
//   clientnb:''
// })
// const handleAddFormChange = (event)=>{
//   event.preventDefault();
  
//   const fieldName = event.target.getAttribute('name');
//   const fieldValue= event.target.value;
//   const newFormData={ ...addFormData};
//   newFormData[fieldName]=fieldValue;
  
//   setAddFormData(newFormData);
  
//   }
  
//   const handleAddFormSubmit=(event)=>{
//   event.preventDefault();
  
//   const newContact= {
//   id:nanoid(),
//   sessionnb: addFormData.sessionnb,
//   num_rounds: addFormData.num_rounds,
//   clientsnb: addFormData.clientsnb,
//   };
// const newContacts = [ ...contacts, newContact];
// setContacts(newContacts);
// toast('Training session has started successfully!');
//   };  

  const [round, setRound] = useState(0);
  const [client, setClient] = useState(1);

  async function launch (){
  
    let data = {num_rounds: round,ipaddress:'127.0.0.1', port:8080,resume:true, num_clients: client}
    const url = 'http://127.0.0.1:8000/launchFL';
    console.log(data);
    toast('Training session has started successfully !');
    await axios.post(url,data).then((response) => {
        console.log(response.data);
        
      }).catch(err=>{
        console.log("error",err);
      });
      // toast('Training session has started successfully !');
      };


      const [hist, setHist] = useState([]);

      // const getData = async () => {
      //   const { data } = await axios.get(`http://127.0.0.1:8000/selectHist`);
      //   setData(data);
      // };
      const getHist = async () => {
        // this.setState({notifs:[this.state.notifs,...[]]})
        let tab = []
        await axios.get("http://127.0.0.1:8000/selectHist").then(
            (res )=> {
                tab = res.data;
              console.log("tab hist",res)
              // setHist({hist:[hist,...tab]})
              setHist(tab)
            })
        .catch(error => {console.log(error)});
       
        console.log("hists",hist)
        return tab;
      }
      useEffect(() => {
        getHist();
      }, []); 

  return (
<div className='card-container'>
<table>
        <tr>
          <th><h3  className='text'>Training Sessions</h3></th>
          <th>
       
  <button onClick={togglePopup} className='but'><FaPlay color="#132c3d" className='launch' ></FaPlay></button>
    {isOpen && <Popup
      content={<>
        <b>Start New Session</b>
        <hr></hr>
        <h5 className='number'>Number of rounds</h5>
        <form className='form'>
          <div class="form-group">
            <input type="number" class="form-control" id='num' className='input' placeholder="0" onChange={(e)=>setRound(e.target.value)} />
            {/* <input type="number" class="form-control" className='input'  name="num_rounds" id='num' onChange={handleAddFormChange} placeholder="0" /> */}
            <h5 className='number' style={{marginBottom:"3%"}}>Number of clients</h5>
            <input type="number" class="form-control" id='num' className='input' placeholder="0" onChange={(e)=>setClient(e.target.value)} style={{marginTop:"-20%"}}/>

          </div>
        </form>
        <hr></hr>
        {/*<button className='but1' >Close</button>*/}
        <button className='but2' onClick={()=>{launch()}}style={{backgroundColor:'#1C4F6F'}} >Submit</button>
        {/* <button className='but2' type="submit" value="Submit" onClick={handleAddFormSubmit} style={{backgroundColor:'#1C4F6F'}}>Submit</button> */}
        {/* <ToastContainer /> */}
          </>}
      handleClose={togglePopup}
    />}
            <ToastContainer />

 

</th>
         
        </tr>
</table>

 <hr className='line'>
 </hr>
 
 <div className='app'>
 <table className='table'>
   <thead>
 <tr>
 <th className='th1'>Session date </th>
 <th className='th1'>Nb. of rounds</th>
 <th className='th1'>Accuracy</th>
 </tr>
 </thead>
 <tbody>
   {
     hist.map((item, index)=>{ return <tr key={index}>
      <td>{item[1]}</td>
      <td>{item[2]}</td>
      <td>{item[3]}</td>
     </tr>})
   }
   
 </tbody>
 </table>
 </div>
 
 
 
</div>
  )
} 

export default Server;