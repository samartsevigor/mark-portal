import React, {useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import {authenticate, isAuth} from "./helpers";
import {Redirect} from "react-router-dom";


const SigninForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/signin`, values)
      .then((res) => {
        authenticate(res)
        setValues({email: '', password: ''})
      })
      .catch((error) => {
        toast.error(error.response.data.error)
      })
  }
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }
  const {email, password} = values
  return (
    <>
    {isAuth() ? <Redirect to='/' /> : null}
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="text" className="form-control" id="email" value={email} name="email" onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="text" className="form-control" id="password" value={password} name="password" onChange={handleChange}/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </>
  );
};

export default SigninForm;