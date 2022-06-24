import { useState, useEffect,React } from 'react'
import {
  Table, Container,
  Row, Col,
  Button,
  Card, CardHeader, Input
} from "react";
import axios from 'axios';


const Notif = () => {

  //const [url, setUrl] = useState("");

  const [List, setList] = useState([]);
const [status,setStatus]=useState(0)
 
// getnotif
const getNotif = async () => {
    let tab = []
    await axios.get("http://127.0.0.1:8000/selectNotif").then(
        res => {tab = res.data.list})
    .catch(error => {console.log(error)});
    return tab;
  }

  useEffect(() => {
    getNotif();
  }, [])

  const Accepter = async (item)=>{
    console.log(item.id_client)
    let data = {client_id: item.id_client, notif_date:item.notif_date}
    const url = 'http://127.0.0.1:8000/clientAccept';
    console.log(data)
    await axios.post(url,data).then((response) => {
        console.log(response.data);
        
      }).catch(err=>{
        console.log("error",err);
      });


  };

  const Decline = async (item)=>{
    console.log(item.id_client)
    let data = {client_id: item.id_client, notif_date:item.notif_date}
    const url = 'http://127.0.0.1:8000/clientAccept';
    console.log(data)
    await axios.post(url,data).then((response) => {
        console.log(response.data);
        
      }).catch(err=>{
        console.log("error",err);
      });

  };

  return (
  
      
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              {/* Header */}
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">DID Request</h3>
                  </Col>
                  <Col xs="4">
                    <Input
                      type="select"
                      id="exampleSelect"
                      name="select"
                      onChange={(e) => setStatus(e.target.value)}>
                      <option value="0">Pending</option>
                      <option value="1">Issued</option>
                      <option value="2">Declined</option>
                    </Input>
                  </Col>
                </Row>
              </CardHeader>
              {/* List */}
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">client ID</th>
                    <th scope="col">Server name</th>
                    <th scope="col">Start date of the training session</th>
                    {/* <th scope="col">Name</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th> */}
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>{List.map((item, index) => {
                    return item.state === parseInt(status) ?
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.id_client}</td>
                        <td>{item.server_name}</td>
                        <td>{item.notif_date}</td>
                        {/* <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.email}</td>
                        <td>{item.state === 0 ? "Pending" : item.state === 1 ? "Issued" : "Declined"}</td> */}
                        <td>
                          <Button style={{background:"#d7363c",color:"white"}} id={item.id} disabled={item.state !== 0 ? true : false}
                            onClick={() => Accepter(item)}>Accept</Button>
                          <Button id={item.id + "a"} disabled={item.state !== 0 ? true : false} onClick={() => Decline(item)}>Decline Request</Button>
                        </td>
                      </tr> : ""
                })}</tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
   
  );
};


export default Notif;


// { this.state.notifs.map((item,index)=>{   return  <tr key={index}>
//       <td>{item[0]}</td>
//       <td>{item[2]}</td>
//       <td>
//           <button style={{background:"green",color:"white", height: "40px", width: "40px",fontSize:"15px"}}>Yes</button>
//           <button style={{background:"#d7363c",color:"white", height: "40px", width: "40px", marginLeft:"6px",fontSize:"15px"}}>No</button>
//       </td>
//       </tr>    })
//     }