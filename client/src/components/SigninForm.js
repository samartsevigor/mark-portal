import React, {useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'

const SigninForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/signin`, values)
      .then((res) => {
        setValues({email: '', password: ''})
      })
      .catch((error) => {
        toast.error(error.response.data.error)
      })
  }
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="text" className="form-control" id="email" value={values.email} name="email" onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="text" className="form-control" id="password" value={values.password} name="password" onChange={handleChange}/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default SigninForm;