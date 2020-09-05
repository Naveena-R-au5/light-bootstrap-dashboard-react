/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState,useEffect } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import {Modal} from 'react-bootstrap';
import { Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'

const TableList=() =>{
    const [post,setPosts] = useState("")
    const [firstName,setName] = useState("")
    const [s,Save] = useState("")
    const [show, setShow] = useState(false);
    

  const handleClose = () =>setShow(false);
  
  const handleShow = (e) => {
    // console.log("selected candidate id",e)
    Save(e)
    setShow(true)

  }

  // Update candidate name

    const EditTable=()=>{
  
    fetch('http://18.188.185.178:3002/put/candidate',{
      method:"put",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
        "id":s,
      "set" :{
		        "firstName": firstName	
	     }
         
      }),
  }).then(res=>res.json())
  .then(result=>{
      console.log("myupdated data",result)
      // console.log("s",s)
      // console.log("s",firstName)
      setShow(false)
      window.location.reload(true);
      
  })

};

// Get candidates data
  
    useEffect(()=>{
      fetch('http://18.188.185.178:3002/get/candidate',{
      methos:"get",
      headers:{
          "Content-Type":"application/json"
      }
  }).then(res=>res.json())
  .then(result=>{
      console.log("mypics",result.data)
      setPosts(result.data)
  })
  }
  ,[])

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {post?post.map((prop, key) => {
                        return (
                          <tr key={key}>
                            
                              <td>{prop.firstName?prop.firstName:"NA"}</td>
                              <td>{prop.email?prop.email:"NA"}</td>
                              <td>{prop.gender?prop.gender:"NA"}</td>
                              <td>{prop.mobileno?prop.mobileno:"NA"}</td>
                              <td><Button variant="primary" value={prop._id} onClick={(e)=>handleShow(e.target.value)}>
                                    Update
                                 </Button></td>
                                 {/*......... Modal for updating name....... */}
                             <Modal show={show} onHide={handleClose} style={{backgroundColor:"transparent"}}>
                             <Modal.Header closeButton>
                                   <Modal.Title>Update Candidate name</Modal.Title>
                             </Modal.Header>

                                <Form style={{padding:"30px"}}>
                                  
                          <label>Name</label>
                         <input type="text" placeholder="Enter Name"
                            style={{width:"100%",height:"30px",fontSize:"15px",marginBottom:"10px"}} 
                            value ={firstName}
                            onChange={(e)=>setName(e.target.value)}/>
                            <Button onClick={()=>EditTable()}>save</Button>
                     </Form>
                      </Modal>
                          </tr>

                        );
                        
                      }):<h3 className="text-center">Data not found</h3>}
                    </tbody>
                  </Table>
                }
              />
            </Col>

            <Col md={12}>
              <Card
                plain
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
}

export default TableList;
