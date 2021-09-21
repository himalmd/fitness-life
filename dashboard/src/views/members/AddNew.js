import React from "react";
import { useState } from "react";
import Axios from "axios";

import Message from '../upload/Message';
import passwordValidator from '../../utils/passwordValidator';

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";

function MemberAddNew() {

    // Form Data
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [type, setType] = useState("");
    const [address, setAddress] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");

    const [addMessage, setAddMessage] = useState({});

    let passwordErr = passwordValidator(password, rePassword);


    // Add Member Function

  const addMember = () => {

    if(passwordErr == 0){
      try {

        Axios.post("https://fitness-life-server.herokuapp.com/members/add", {
          fName: fName,
          lName: lName,
          email: email,
          telephone: telephone,
          password: password,
          type: type,
          address: address,
          height: height,
          weight: weight,
          age: age,
        }).then((response => {
          setAddMessage({msg: response.data.message, type: response.data.type});
          console.log(response.data);
        }))
  
      } catch (err) {
        if (err.response.status === 500) {
          setAddMessage({msg: 'There was a problem with the server', type: 'danger'});
        } else if (err.response.status === 400) {
          setAddMessage({msg: 'Email Already Exists', type: 'danger'});
        } else {
          setAddMessage({msg: err.response.data.msg, type: 'danger'});
        }
      }

    } else if (passwordErr == 1){
      setAddMessage({msg: 'Password length should be more than 6 characters', type: 'danger'});
    } else {
      setAddMessage({msg: 'Passwords do not match', type: 'danger'});
    }

      
    
  };



  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            {addMessage ? <Message msg={addMessage.msg} type={addMessage.type} /> : null}
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add New Gym Member</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          placeholder="First Name"
                          type="text"
                          onChange={(event) => { setFName(event.target.value); }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          placeholder="Last Name"
                          type="text"
                          onChange={(event) => { setLName(event.target.value); }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Email</label>
                          <Form.Control
                            placeholder="Email"
                            type="email"
                            onChange={(event) => { setEmail(event.target.value); }}
                          ></Form.Control>
                        </Form.Group>
                        
                      </Col>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Telephone</label>
                          <Form.Control
                            placeholder="Telephone"
                            type="text"
                            onChange={(event) => { setTelephone(event.target.value); }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="12">
                        <Form.Group>
                          <label>Address</label>
                          <Form.Control
                            placeholder="Address"
                            type="textarea"
                            onChange={(event) => { setAddress(event.target.value); }}
                          ></Form.Control>
                        </Form.Group>     
                      </Col>
                    </Row>
                    <Row>
                    <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Password</label>
                          <Form.Control
                            type="password"
                            onChange={(event) => { setPassword(event.target.value); }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Re Enter Password</label>
                          <Form.Control
                            type="password"
                            onChange={(event) => { setRePassword(event.target.value); }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Height</label>
                          <Form.Control
                            type="number"
                            onChange={(event) => { setHeight(event.target.value); }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Weight</label>
                          <Form.Control
                            type="number"
                            onChange={(event) => { setWeight(event.target.value); }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Age</label>
                          <Form.Control
                            type="number"
                            onChange={(event) => { setAge(event.target.value); }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                     <Col className="pr-1" md="12">
                        <Button
                          className="btn-fill pull-right"
                          variant="primary"
                          onClick={addMember}
                        >
                          Add Member
                        </Button>
                     </Col>
                    </Row>              
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {addMessage ? <Message msg={addMessage.msg} type={addMessage.type} /> : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MemberAddNew;
