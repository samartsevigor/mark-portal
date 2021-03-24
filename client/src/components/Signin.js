import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./Layout";
import SigninForm from "./SigninForm";

const Signup = () => {
  return (
    <Layout>
      <ToastContainer />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="my-2">Signin</h2>
          <SigninForm />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;