import React from 'react';
import Navbar from "./Navbar";

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      <div className="container my-3">
        {children}
      </div>
    </>
  );
};

export default Layout;