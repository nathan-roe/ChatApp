import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import {Form, Container, Button} from 'react-bootstrap';
import RegisterForm from '../../components/RegisterForm';
const Register = () => {
    const createUser = user => {
        axios.post('http://localhost:8000/api/users/new', user)
            .then(res => navigate('/main/' + res.data._id + '/5fb4a3eb1285541d50d8cc7d'))
            .catch(err => console.log(err));
    }


    return (
        < RegisterForm onSubmitProp={createUser}/>
    );
}
export default Register;