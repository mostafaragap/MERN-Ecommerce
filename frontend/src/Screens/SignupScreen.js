import Container from 'react-bootstrap/Container';
import {Helmet} from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate} from "react-router-dom";
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { Store } from "../Store";
import { toast } from 'react-toastify';
import { getError } from '../components/utils';

export default function SignupScreen()
{
    const navigate = useNavigate();

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
const {state , dispatch:ctxDispatch} = useContext(Store);
const {userInfo} = state ;
const submitHandler =async (e) =>{
    e.preventDefault();
    
    if(password !== confirmPassword){
      toast.error('passwords do not match');
      return ;
    }else if(name.length <= 3)
    {
      toast.error('sorry , name should contain more then 4 characters');
      return ;

    }else if(password.length < 8)
    {
      toast.error('sorry , password should contain more then 8 characters');
      return ;

    }
    try{
        const {data} = await Axios.post('/api/users/signup' , {
          name,
          email ,
            password ,
        });
        ctxDispatch({type : 'USER_SIGNIN',payload : data });
        localStorage.setItem('userInfo' , JSON.stringify(data));
        navigate(redirect || '/');


    }catch(err){
        toast.error(getError( err));

    }
};
useEffect(()=> {
    if(userInfo)
    {
        navigate(redirect);

    }
    
} , [navigate , redirect , userInfo]);

   return (
    <Container className="small-container" id='small-container'>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group className="mb-3" controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control 
         
          onChange = {(e) => setName(e.target.value)}
            required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" 
         
          onChange = {(e) => setEmail(e.target.value)}
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
          
           onChange ={(e) => setPassword(e.target.value)}
           required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password"
          
           onChange ={(e) => setConfirmPassword(e.target.value)}
           required />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
         Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
      </Form>
    </Container>
  );
}