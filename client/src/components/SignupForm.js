import React, {useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'

const SignupForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/signup`, values)
      .then((res) => {
        setValues({name: '', email: '', password: ''})
        toast.success(res.data.message)
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
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" value={values.name} name="name" onChange={handleChange}/>
      </div>
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

export default SignupForm;