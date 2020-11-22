import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {Link} from '@reach/router';
import {Form, Container, Button} from 'react-bootstrap';
const RegisterForm = ({onSubmitProp}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImg] = useState('default-avatar.png')
    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({firstName, lastName, email, phone, password, confirmPassword, profileImg});
        
    }
    return (
        <Container style={{display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid grey", height: "fit-content", width: "50vw", justifyContent: "space-between", marginTop: "1vh", marginBottom: "1vh"}}>
        <h1 style={{paddingTop: "2vh"}}>Chat App</h1>
        <h3>Register</h3>
        <Form style={{width: "50%"}} onSubmit={onSubmitHandler}>
            <Form.Group>
                <Form.Label style={{marginBottom: "-15px", paddingLeft: "10px", textAlign: "center", width: "100%"}}>
                    <span style={{marginBottom: "-15px", zIndex: "2", backgroundColor: "white", padding: "1px", color: "gray"}}>First Name</span>
                </Form.Label>
                <Form.Control type="text" style={{paddingTop: "5px", marginTop: "-12px", textAlign: "center", color: "black"}} onChange={e => setFirstName(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label style={{marginBottom: "-15px", paddingLeft: "10px", textAlign: "center", width: "100%"}}>
                    <span style={{marginBottom: "-15px", zIndex: "2", backgroundColor: "white", padding: "1px", color: "gray"}}>Last Name</span>
                </Form.Label>
                <Form.Control type="text" style={{paddingTop: "5px", marginTop: "-12px", textAlign: "center", color: "black"}} onChange={e => setLastName(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label style={{marginBottom: "-15px", paddingLeft: "10px", textAlign: "center", width: "100%"}}>
                    <span style={{marginBottom: "-15px", zIndex: "2", backgroundColor: "white", padding: "1px", color: "gray"}}>Email Address</span>
                </Form.Label>
                <Form.Control type="email" style={{paddingTop: "5px", marginTop: "-12px", textAlign: "center", color: "black"}} onChange={e => setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label style={{marginBottom: "-15px", paddingLeft: "10px", textAlign: "center", width: "100%"}}>
                    <span style={{marginBottom: "-15px", zIndex: "2", backgroundColor: "white", padding: "1px", color: "gray"}}>Phone Number</span>
                </Form.Label>
                <Form.Control type="tel" style={{paddingTop: "5px", marginTop: "-12px", textAlign: "center", color: "black"}} onChange={e => setPhone(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label style={{marginBottom: "-15px", paddingLeft: "10px", textAlign: "center", width: "100%"}}>
                    <span style={{marginBottom: "-15px", zIndex: "2", backgroundColor: "white", padding: "1px", color: "gray"}}>Password</span>
                </Form.Label>
                <Form.Control type="password" style={{paddingTop: "5px", marginTop: "-12px", textAlign: "center", color: "black"}} onChange={e => setPassword(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label style={{marginBottom: "-15px", paddingLeft: "10px", textAlign: "center", width: "100%"}}>
                    <span style={{marginBottom: "-15px", zIndex: "2", backgroundColor: "white", padding: "1px", color: "gray"}}>Confirm Password</span>
                </Form.Label>
                <Form.Control type="password" style={{paddingTop: "5px", marginTop: "-12px", textAlign: "center", color: "black"}} onChange={e => setConfirmPassword(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group style={{display: "flex", justifyContent: "center"}}>
                <Button type="submit">
                    Continue
                </Button>
            </Form.Group>
        </Form>
        <p>Already a User? <Link to={"/"}>Log In!</Link></p>
    </Container>
    );
}
export default RegisterForm;