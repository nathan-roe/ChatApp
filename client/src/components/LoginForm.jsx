import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {Link} from '@reach/router';
import {Form, Container, Button} from 'react-bootstrap';
const LoginForm = ({onSubmitProp}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({email, password});
    }
    return (
        <Container style={{display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid grey", height: "75vh", width: "50vw", justifyContent: "space-between", marginTop: "5vh", marginBottom: "5vh"}}>
            <h1 style={{paddingTop: "2vh"}}>Chat App</h1>
            <h3>Sign In</h3>
            <Form style={{width: "50%"}} onSubmit={onSubmitHandler}>
                <Form.Group>
                    <Form.Label style={{marginBottom: "-15px", paddingLeft: "10px", textAlign: "center", width: "100%"}}>
                        <span style={{marginBottom: "-15px", zIndex: "2", backgroundColor: "white", padding: "1px", color: "gray"}}>Email or Phone</span>
                    </Form.Label>
                    <Form.Control type="text" style={{paddingTop: "5px", marginTop: "-12px", textAlign: "center", color: "black"}} onChange={e => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{marginBottom: "-15px", paddingLeft: "10px", textAlign: "center", width: "100%"}}>
                        <span style={{marginBottom: "-15px", zIndex: "2", backgroundColor: "white", padding: "1px", color: "gray"}}>Password</span>
                    </Form.Label>
                    <Form.Control type="password" style={{paddingTop: "5px", marginTop: "-12px", textAlign: "center", color: "black"}} onChange={e => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group style={{display: "flex", justifyContent: "center"}}>
                    <Button type="submit">
                        Continue
                    </Button>
                </Form.Group>
            </Form>
            <p>Not a User? <Link to={"/register"}>Create an Account!</Link></p>
        </Container>
    );
}
export default LoginForm;
