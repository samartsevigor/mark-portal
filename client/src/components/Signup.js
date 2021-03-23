import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./Layout";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <Layout>
      <ToastContainer />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="my-2">Signup</h2>
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;