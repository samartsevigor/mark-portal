import React, {useState, useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Layout from "./Layout";

const Activate = () => {
  const {token:tokenParam} = useParams()
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true
  })

  useEffect(() => {
    setValues({...values, token: tokenParam})
  }, [])

  const {token} = values
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/account-activation`, {token})
      .then((res) => {
        setValues({...values, show: false})
        toast.success(res.data.message)
      })
      .catch((error) => {
        toast.error(error.response.data.error)
      })
  }

  return (
    <Layout>
      <ToastContainer />
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h2 className="my-2">Account activation page</h2>
          <button className="btn btn-primary" onClick={handleSubmit}>Activate account</button>
        </div>
      </div>
    </Layout>
  );
};

export default Activate;