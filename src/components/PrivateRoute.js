import React from "react";
import { Redirect } from "react-router-dom";
import Header from "../layout/Header";
import Navbar from "../layout/NavBar";

const PrivateRoute = (props) => {
  if (!props.isAuthenticated) return <Redirect to="/login" />;
  return (
    <>
      <Header />
      <Navbar />
      <div
        className="private-content"
        style={{
          padding: "10px 2em",
          minHeight: "calc(100vh - 70px)",
          backgroundColor: "#f5f5f5",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default PrivateRoute;
