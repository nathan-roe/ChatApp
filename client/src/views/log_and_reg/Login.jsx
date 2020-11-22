import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import {Form, Container, Button} from 'react-bootstrap';
import LoginForm from '../../components/LoginForm';
const Login = () => {
    const [errors, setErrors] = useState([]);
    const findUser = user => {
        axios.get('http://localhost:8000/api/users/email/' + user.email)
            .then(res => {
                if(res.data.password === user.password){
                    navigate('/main/' + res.data._id + '/5fb4a3eb1285541d50d8cc7d');
                    // axios.post('http://localhost:8000/api/rooms/new')
                    // .then(response => {
                    //     navigate('/main/' + res.data._id + '/' + response.data._id);
                    // })
                    // .catch(err => console.log(err))

                }
                else{
                    setErrors(["Email or Password is incorrect"]);
                }
            })
            .catch(err => {
                console.log(err);
                setErrors(["Email or Password is incorrect"])
            });
    }
    return (
        <div>
            < LoginForm onSubmitProp={findUser}/>
            {
                errors.map((val, i) => {
                return <p key={i}>{val}</p>
                })
            }
        </div>
        
    );
}
export default Login;